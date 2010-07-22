Ext.namespace('NRG.Forms');

/**
 * Common functions for all forms (callbacks and utility methods)
 */

function checkboxgroupChanged(checkboxgroup, checkedItems)
{
    if (NRG.Forms.GlobalReset==true)
        return;

    //console.log('+ checkboxgroupChanged('+checkboxgroup.id+')', checkboxgroup, checkedItems);

    if ((typeof(checkedItems)=="undefined") || (checkedItems==null))
        return;

    //Save the focused element
    var form=checkboxgroup.findParentByType('form');
    form.focusedEl=checkboxgroup.getEl();

    //Parent settings are applied first
    if (typeof(checkboxgroup.disableQ)!="undefined")
        toggleQ(checkboxgroup.disableQ,false);

    if (typeof(checkboxgroup.enableQ)!="undefined")
        toggleQ(checkboxgroup.enableQ,true);

    //Each child's settings is applied individually
    for (var i=0;i<checkedItems.length;++i)
    {
        var checked=checkedItems[i];

        //Child settings override parent settings
        if (typeof(checked.disableQ)!="undefined")
            toggleQ(checked.disableQ,false);

        if (typeof(checked.enableQ)!="undefined")
            toggleQ(checked.enableQ,true);
    }
}


function radiogroupChanged(radiogroup, checked)
{
    if (NRG.Forms.GlobalReset==true)
        return;

    //console.log('+ radiogroupChanged('+radiogroup.id+')',radiogroup,checked);

    if ((typeof(checked)=="undefined") || (checked==null))
        return;

    //-- Decide which questions to disable/enable --
    var disableQ=null;
    var enableQ=null;

    //Child settings override parent settings
    if (typeof(checked.disableQ)!="undefined")
        disableQ=checked.disableQ;

    if (typeof(checked.enableQ)!="undefined")
        enableQ=checked.enableQ;

    //Check parent settings
    if (!disableQ && !enableQ)
    {
        if (typeof(radiogroup.disableQ)!="undefined")
            disableQ=radiogroup.disableQ;

        if (typeof(radiogroup.enableQ)!="undefined")
                enableQ=radiogroup.enableQ;
    }

    if (disableQ)
        toggleQ(disableQ,false);

    if (enableQ)
        toggleQ(enableQ,true);

    //-- Decide which question is next
    var next=null;

    if (typeof(checked.next)!="undefined")
        next=checked.next;
    else
        if (typeof(radiogroup.next)!="undefined")
            next=radiogroup.next;

//    //Disselect the current item
//    var qContainer=getQContainer(checked);
//    if (qContainer)
//    {
//        //console.log('  radiogroupChanged(): Found qContainer ',qContainer.id);
//        setQActive(qContainer,false);
//    }
//    else
//        //console.log('  radiogroupChanged(): qcontainer not found.');

    //Find the form object
    //var form=radiogroup.findParentByType('form');

    //Jump to the next question (or trigger form done)
    //nextQ(next,form);
    nextField(radiogroup,next);
}


function onEnter(field,e)
{
    if (e.getKey()!=e.ENTER)
        return;

    //console.log('+ onEnter('+field.id+')');

    nextField(field);
}

/** Jumps to the next field. Uses field.next to determine which is the next element
 * to transfer the focus to. 
 * @param field   The source field (the one that triggered the change)
 * @param where   An optional ID of the next element to focus
 */
function nextField(field, where)
{
    //console.log('+ nextField('+field.id+','+where+')');
    
    if (!(field instanceof Ext.Component))
        field=Ext.getCmp(field.id);

    //Next question ID or Array of IDs to jump to
    var next=null;

    if (defined(where))
        next=where;
    else
    if (defined(field.next))
        next=field.next;

    //console.log('  nextField(): now next and field.next='+field.next)

    if (field.getEl().dom.type=="radio")
    {
        //console.log('  nextField(): '+field.id+' is a radio button.');
        var rg=field.findParentByType('radiogroup');
        if (rg)
        {
            //console.log('  nextField(): Found radiogroup: '+rg.id+', replacing field parameter');
            field=rg;
        }
        else
        {
            //console.log('  nextField(): Could not find parent radiogroup :/');
        }
    }

    //We want to check if the field is valid, but if it's a radio, we need to
    //check the entire radiogroup, not just this field.
    var valid=field.isValid();

    //TODO: Check for Component/Element
    //Verify that the field is valid
    if (valid)
    {
        //Remove the active class from the current element
        var qContainer=getQContainer(field);
        if (qContainer)
        {
            //console.log('  nextField: removing active state from '+qContainer.id+' for child field '+field.id);
            setQActive(qContainer,false);
        }

        //console.log('  nextField('+field.id+'): Field is valid, looking for form.');
        var form=field.findParentByType('form');

        //Remove the active class form what used to be the focused element
        //because the user might have shifted focus with the mouse, and in
        //that case, the field parameter might not be the one with the
        //q-active class set
        if ((form.focusedEl) && (form.focusedEl.id!=field.id))
        {
            //console.log('nextField(): Checking if ',form.focusedEl.id,' is q-active.');
            qContainer=getQContainer(form.focusedEl);
            setQActive(qContainer,false);
        }

        if (next)
        {
            //console.log('nextField():Moving to the next element: '+next);
            nextQ(next,form);
        }
        else
            promptSaveForm(form);
    }
    else
    {
        //console.log('nextField(): Field ',field.id,' is not valid.');
    }
}

function promptSaveForm(form)
{
    //console.log('promptSaveForm('+form.id+')');

    if ((typeof(form)=="undefined") || (form==null))
    {
        //console.log('promptSaveForm(): form argument is undefined/null :/');
        return;
    }

    //If there are still fields that need to be completed, find and highlight them
    if (!form.getForm().isValid())
    {
        highlightInvalidFields(form);
        return;
    }

        Ext.Msg.show({
            title:'Save Dialog',
            msg:"It looks like you\'re ready to save this form.<br/>Would you like to save it now?",
            buttons:Ext.MessageBox.YESNOCANCEL,
            icon:Ext.MessageBox.QUESTION,
            fn:msgboxSaveHandler,
            form:form
        });
}

function highlightInvalidFields(form)
{
    if (!defined(form))
        return;

    var items=form.getForm().items.items;
    for (var i=0;i<items.length;++i)
    {
        if (!items[i].isValid())
        {
            var qContainer=getQContainer(items[i]);
            if (qContainer)
            {
                //console.log('promptSaveForm(): Scrolling '+items[i].getEl().id+' into view...');
                qContainer.scrollIntoView(Ext.getCmp('panelForms').body);
                qContainer.highlight();
            }
            else
            {
                items[i].getEl().scrollIntoView(Exte.getCmp('panelForms').body);
                items[i].getEl().highlight();
            }
            focusCmp(items[i]);
            break;
        }
    }
}

function msgboxSaveHandler(button, text, config)
{
    //console.log('+ msgboxSaveHandler('+button.id+')');
    if (button=="yes")
        formDone(config.form);

    focusCmp(config.form.focusedEl);
}

//Transfers keyboard focus to the next question
function nextQ(ids, form)
{
    //console.log('+ nextQ("'+ids+'",'+form.id+')');

    var id=ids; //This will be changed later by the for-loop if necessary
    var nextQCmp=null;

    if (ids instanceof Array)
    {
        var cmp=null;
        //Try to find a non-disabled ID
        for (var i=0;i<ids.length;++i)
        {
            cmp=Ext.getCmp(ids[i]);
            if ((typeof(cmp)!="undefined") && (cmp!=null))
                if (!cmp.disabled)
                {
                    id=ids[i];
                    nextQCmp=cmp;
                }
        }
    }
    else
        nextQCmp=Ext.getCmp(ids);

    //If there is no next question to jump to, or the question is disabled, then
    //prompt the user to save the form
    if ((typeof(nextQCmp)=="undefined") || (nextQCmp==null) || (nextQCmp.disabled==true))
    {
        promptSaveForm(form);
        return;
    }

    //Mark question container as active if effects are supported
    //Highlight and permanently colorize
    if (Ext.enableFx)
    {
        var qContainer=getQContainer(nextQCmp);
        if (qContainer)
            setQActive(qContainer,true);
    }

    focusObj=focusCmp(nextQCmp);
    //Find the form this question belongs to
    if ((typeof(form)!="undefined") && (form!=null))
    {
        form.focusedEl=focusObj;
        //console.log('  nextQCmp: Saved focused element: '+focusObj.id);
    }
}

//Returns the Ext.Element that received focus
function focusCmp(cmp)
{
    //console.log('+ focusCmp('+cmp.id+')');

    var focusObj=null;

    //If we have an input component, focus it
    if ((cmp instanceof Ext.Component) && (cmp.getEl().dom.tagName=="INPUT"))
        focusObj=cmp.getEl();
    else
        //If we have an input element, focus it
        if ((cmp instanceof Ext.Element) && (cmp.dom.tagName=="INPUT"))
            focusObj=cmp;
    else
        //Otherwise, search for input elements in the container
        focusObj=Ext.select('div[id="'+cmp.id+'"] input').item(0);

    //No input element to focus? Try to focus the component itself
    if (focusObj==null)
    {
        if (defined(cmp.el))
            focusObj=cmp.getEl();
        else
            focusObj=cmp;
    }

    focusObj.focus();

    var qContainer=getQContainer(focusObj);

    if (qContainer)
        qContainer.scrollIntoView(Ext.getCmp('panelForms').body);
    else
        //Try to bring the element into view
        focusObj.scrollIntoView(Ext.getCmp('panelForms').body);

    return focusObj;
}

function toggleQ(ids,state)
{
    if (NRG.Forms.GlobalReset==true)
        return;

    //console.log('+ toggleQ("'+ids+'"',state,')');

    if (typeof(ids)==undefined)
        return;

    if (!(ids instanceof Array))
        ids=[ids];

    var component=null;

    //Find all components that match that ID and disable/enable them
    for (var i=0;i<ids.length;++i)
    {
        component=Ext.getCmp(ids[i]);

        if (typeof(component)=="undefined")
        {
            //console.log('  toggleQ(): ERROR: Component '+ids[i]+' could not be found :(');
            continue;
        }

        if (state)
        {
            component.enable();
            component.getEl().up('.q-container').removeClass('q-valid');

            //remove value for checkbox- and radio- groups
            if ((component.xtype=="checkboxgroup") ||
                (component.xtype=="radiogroup"))
                component.setValue("");
        }
        else
        {

            component.setValue("");
            component.getEl().up('.q-container').removeClass('q-invalid');
            component.getEl().up('.q-container').addClass('q-valid');
            component.disable();
        }
    }
}

//Triggered when the form is done
function formDone(form)
{
    //console.log('+ formDone('+form.id+'): Form '+form.id+' is done: ', form.getForm().getValues());

    //Quick hack
    btnSaveClicked(Ext.getCmp('btnSave'));

}

function onFormKeypress(keycode, event)
{
    //console.log('+ onFormKeypress('+keycode+'): FORM KEYPRESS :', keycode, event.target);

    var fieldCmp=Ext.getCmp(event.target.id);

    //User clicked on SOMETHING that is not an Ext component.
    //In this case, try to re-use the form.focusedEl property, if available
    if (typeof(fieldCmp)=="undefined")
    {
        //Get the keycode the long-way, since we're not passed the form as a parameter'
        var focusedEl=Ext.getCmp('tabForms').getActiveTab().focusedEl;
        //Did we find the previously focused form element?
        if (typeof(focusedEl)!="undefined")
        {
            //Make sure the browser's focus is on that element too
            focusCmp(focusedEl);
            //And now re-use that element as if the keycode came from it
            fieldCmp=Ext.getCmp(focusedEl.id);
        }
        //Otherwise this keypress came from no place we can recognize, so  we're going to happily ignore the event
        //which will probably annoy a few non-compliant users. Alternatively,
        //we could search up the tree to find some component.. but due to time
        //constraints, we'll just discard this key. Bye bye!
        else
            return;
    }

    //See if we can check what kind of component it is
    if ((typeof(fieldCmp.autoEl)=="undefined") || (typeof(fieldCmp.autoEl)==null))
        return;

    switch (fieldCmp.autoEl.type)
    {
        case "radio": radioKeypress(fieldCmp, keycode, event); break;
        case "checkbox": checkboxKeypress(fieldCmp, keycode, event); break;
    }

}

function radioKeypress(field,keycode,event)
{
    //console.log('+ radioKeypress('+field.id+','+keycode+')');
    //Get the parent radio group
    var group=field.findParentByType('radiogroup');
    var charcode=keycode-48;

    if ((typeof(group)=="undefined") || (group==null))
        return;

    group.setValue(charcode);
}

function checkboxKeypress(field,keycode,event)
{
    //console.log('+ checkboxKeypress('+field.id+','+keycode+')');
    //Get the parent checkboxgroup
    var group=field.findParentByType('checkboxgroup');
    var charcode=keycode-48;
    var checkbox=null;

    //Search for the correct checkbox
    for (var i=0;i<group.items.items.length;++i)
    {
        if (group.items.items[i].inputValue==charcode)
        {
            checkbox=group.items.items[i];
            break;
        }
    }

    if (!checkbox)
        return;

    group.setValue(checkbox.getName(),!checkbox.getValue());
}

function getQContainer(field)
{
    if (!defined(field)) return null;

    //console.log('+ getQContainer('+field.id+')');

    var el=null;

    if (field instanceof Ext.Component)
    {
        el=field.getEl();
        //console.log('  getQContainer(): instance of Ext.Component: ', el);
        //Some components don't return an Ext.Element with getEl().
        //Here we're showing the finger to those components.
        if (!defined(el))
        {
            var cmpId=field.getId();
            el=Ext.get(cmpId);
        }
    }
    else
    if (field instanceof Ext.Element)
    {
        //console.log('  getQContainer(): instance of Ext.Element');
        el=field;
    }
    else
    if (Ext.isElement(field))
    {
        el=new Ext.Element(field);
        //console.log('  getQContainer(): created new Ext.Element:', el);
    }
    else
    {
        //console.log('!! RunTimeError: common.js::getQContainer(): Parameter "field" is invalid.');
        return null;
    }

    var container=null;
    if (el.hasClass('q-container'))
    {
        container=el;
        //console.log('  getQContainer(): '+field.id+' is a q-container itself.');
    }
    else
        container=el.up('.q-container');

    if (!container)
    {
        console.error('  getQContainer('+field.id+'): ERROR: No container found. Did you forget to add a q-container class to the question component?');
        return null;
    }

    //console.log('  getQContainer('+field.id+'): Question Container: ',container.id);

    return container;
}

//Marks a question as valid or invalid
function setQValidity(qContainer, validity)
{
    if (!defined(qContainer)) return;

    //console.log('+ setQValidity('+qContainer.id+',',validity,')');

    //Remove all validity classes
    qContainer.removeClass('q-invalid');
    qContainer.removeClass('q-valid');

    //Add the appropriate class
    if (validity)
        qContainer.addClass('q-valid');
    else
        qContainer.addClass('q-invalid');
}

//Marks a question container as active
function setQActive(qContainer,active)
{
    if (!defined(qContainer)) return;

    //Clear the active class by default
    qContainer.removeClass('q-active');

    if (active)
    {
        //console.log('+ setQActive(): Setting active state for: '+qContainer.id);
        qContainer.addClass('q-active');
    }
    else
    {
        //console.log('+ setQActive(): Removed active state for: '+qContainer.id);
    }
}

function onFieldValid(field)
{
    if (NRG.Forms.GlobalReset==true)
        return;

    //console.log('+ onFieldValid('+field.id+')');

    var qContainer=getQContainer(field);

    if (!qContainer.hasClass('q-valid'))
        setQValidity(qContainer,true);
}

function onFieldInvalid(field,message)
{
    if (NRG.Forms.GlobalReset==true)
        return;

    //console.log('+ onFieldInvalid('+field.id+')');

    var qContainer=getQContainer(field);
    if (!qContainer.hasClass('q-invalid'))
        setQValidity(qContainer,false);
}

function onFieldFocus(field)
{
    var form=field.findParentByType('form');
    if ((typeof(form)=="undefined") || (form==null))
        return;

    //console.log('+ onFieldFocus('+field.id+'): Updating form focused element. ');
    //Update current focused element for this form
    form.focusedEl=field.getEl();
}


function onFormShow(form)
{
   //Does the form have a keymap associated with it?
    if (typeof(form.keyMap)=="undefined")
    {
        //console.log('No keymap yet');
        return;
    }

    //console.log('+ onFormShow('+form.id+'): Enabling keymap for: ',form.id);
    //Deactivate the keymap
    form.keyMap.enable();
}

function onFormActivated(form)
{
    console.log('+ onFormActivated('+form.id+')');

    //Focus and highlight the appropriate element for this form
    if ((typeof(form.focusedEl)=="undefined") || (form.focusedEl==null))
    {
        form.focusedEl=Ext.select('input',false,form.getEl().dom).item(0);
        //console.log('  onFormActivated(): Searched for a new input element to highlight and found this: ',form.focusedEl)
    }

    //If the form is hidden, then we should not focus any elements yet
    if (Ext.getCmp('btnGo').isVisible())
        return;

    if ((typeof(form.focusedEl)!="undefined") && (form.focusedEl!=null))
    {
        //console.log('  onFormActivated(): Highlighting focused element: '+form.focusedEl.id);
        form.focusedEl.focus();
        form.focusedEl.up('div').highlight('#EEEEFF');
    }
    else
    {
        //console.log('  onFormActivated(): No element to highlight for form '+form.id);
    }

    if (!defined(form.radioShortcutLabels))
    {
        //Find all radiobuttons and checkboxes on this form
        var inputs=form.getEl().select('input[type=radio], input[type=checkbox]');

        //Add shortcut hints to each radio element
        inputs.each(function(input){
            if (!defined(input.shortcutLabel))
                addShortcutLabel(input);
        });

        form.radioShortcutLabels=true;
    }

}

function addShortcutLabel(input)
{
    var label='<span class="q-radio-shortcut">'+input.dom.value+'</span>';
    input.insertSibling(label,'before');
    console.log('Inserted label for ',input.id);
}



/* This is not cross-browser compatible, but the requirements said Firefox is all
 * we care about, and I'm done writing 'if (typeof...'.
 */
function defined(somevar)
{
    if ((typeof(somevar)=="undefined") || (somevar==null))
        return false;

    return true;
}