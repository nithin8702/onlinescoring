/* common.js tabsize=4
 *
 * Common methods for other Ext components. Most of these are used by the data
 * entry forms.
 *  window.onkeypress captures the TAB keypress. Works in FF3. Does not work in Chrome.
 *
 * @author  Victor Petrov <victor_petrov@harvard.edu>
 * @date    July 20, 2010
 * @copyright (c) 2010 The Presidents and Fellows of Harvard College
 * @copyright (c) 2010 The Neuroinformatics Research Group at Harvard University
 * @license   GPLv3 <http://www.gnu.org/licenses/gpl-3.0.txt>
 * -----------------------------------------------------------------------------
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * -----------------------------------------------------------------------------
 */

Ext.namespace('NRG.Forms');

NRG.Forms.NoResponse=9999;
//The regex below allow empty strings
NRG.Forms.T_String=/^[\w\-\+@\?&% ,\.();/:!]*$/;
NRG.Forms.T_StringWithQuotes=/^[\w\-\+@\?&% ,\.();/':!]*$/;

window.onkeypress=function(key)
{
    if (key.keyCode==9)
    {
        var currentForm=Ext.getCmp('tabForms').getActiveTab();

       //Don't do anything funky if Shift+Tab was pressed.
        if (key.shiftKey)
        {
            return;
        }

        key.preventDefault();
        key.stopPropagation();
        if (currentForm.focusedEl)
        {
//            console.log('Focus is at: ', currentForm.focusedEl.id);
            nextField(currentForm.focusedEl);
        }
    }
    else
    {
        switch (key.charCode)
        {
            //Ctrl+Shift+Plus
            case 43: if (key.ctrlKey && key.shiftKey)
                        nextForm();
                     break;
            case 45: if (key.ctrlKey && key.shiftKey)
                        previousForm();
                     break;
        }
    }
}

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
    //console.log(field);
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

//    if (next)
//        console.log('  nextField(): Going to '+next+', field.next was '+field.next);
//    else
//        console.warn('  nextField(): next is '+next);

    if (field.getEl().dom.type=="radio")
    {
        //console.log('  nextField(): '+field.id+' is a radio button.');
        var rg=field.findParentByType('radiogroup');
        if (rg)
        {
            //console.log('  nextField(): Found radiogroup: '+rg.id+', replacing field parameter');
            field=rg;
            if ((!next) && (defined(field.next)))
                next=field.next;
        }
        else
        {
            //console.log('  nextField(): Could not find parent radiogroup :/');
        }
    }

    //We want to check if the field is valid, but if it's a radio, we need to
    //check the entire radiogroup, not just this field.
//    console.log('Field to validate: ',field);

    var valid=true;

    //By default, fields are valid (Fieldsets for example, they don't have a isValid() method)
    //but if the object is an instance of Ext.form.Field, then it does have an isValid()
    //method and we should check if the field is valid.
    if (field instanceof Ext.form.Field)
    {
        //Check validity
        valid=field.isValid();

        //If the object has a custom validation handler, then run it now.
        if (defined(field.validationHandler))
            valid=field.validationHandler(field);
    }

    //Verify that the field is valid
    if (valid)
    {
        //Remove the active class from the current element
        var qContainer=getQContainer(field);
        if (qContainer)
        {
//            console.log('  nextField: removing active state from '+qContainer.id+' for child field '+field.id);
            setQActive(qContainer,false);
            if (!field.ignoreValidState)
                setQValidity(qContainer,true);
        }

//        console.log('  nextField('+field.id+'): Field is valid, looking for form.');
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
//            console.log('nextField(): Moving to the next element: '+next);
            nextQ(next,form);
        }
        else
        {
            if (form.saved)
            {
                var btnNext=Ext.getCmp(form.id+':btnNext');
                if (btnNext)
                    btnNext.focus();
            }
            else
                promptSaveForm(form);
        }
    }
    else
    {
//        console.log('nextField(): Field ',field.id,' is not valid.');
    }
}

function promptSaveForm(form)
{
//    console.log('promptSaveForm('+form.id+')');

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

    if (form.saved)
        return;

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
                setQValidity(qContainer,false);
            }
            else
            {
                items[i].getEl().scrollIntoView(Exte.getCmp('panelForms').body);
                items[i].getEl().highlight();
                setQValidity(items[i].getEl(),false);
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
                    break;
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
                {
                    console.log("Setting value of radiogroup ",component.getId()," to ''");
                    component.setValue("");
                    //Make sure textboxe values are not set to "false"
                    component.getEl().select('input[type="text"]').each(function(el,c,index)
                    {
                        el.dom.value="";
                        console.log("Cleared value from "+el.dom.id);
                    });
                }
        }
        else
        {
            console.log("Setting value of radiogroup ",component.getId()," to ''");
            component.setValue("");
            component.getEl().up('.q-container').removeClass('q-invalid');
            component.getEl().up('.q-container').addClass('q-valid');
            //Make sure textboxe values are not set to "false"
            component.getEl().select('input[type="text"]').each(function(el,c,index)
            {
                el.dom.value="";
                console.log("Cleared value from "+el.dom.id);
            });

            component.disable();
        }
    }
}

//Triggered when the form is done
function formDone(form)
{
    //console.log('+ formDone('+form.id+'): Form '+form.id+' is done: ', form.getForm().getValues());

    if (!form.saved)
        //Quick hack
        btnSaveClicked(Ext.getCmp('btnSave'));
    else
        nextForm();
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
        case "radio":radioKeypress(fieldCmp, keycode, event);break;
        case "checkbox":checkboxKeypress(fieldCmp, keycode, event);break;
    }
}

function radioKeypress(field,keycode,event)
{
    //console.log('+ radioKeypress('+field.id+','+keycode+')');
    //Get the parent radio group
    var group=field.findParentByType('radiogroup');
    var charcode=getNumCode(keycode);

    if ((typeof(group)=="undefined") || (group==null))
        return;

    //Get the component
    var groupCmp=Ext.getCmp(group.id);
    var ok=true;
    if (groupCmp)
    {
        //Satisfies minValue condition?
        if ((defined(groupCmp.minValue)) && (groupCmp.minValue>charcode))
            ok=false;

        //Satisfies maxValue condition?
        if ((defined(groupCmp.maxValue)) && (groupCmp.maxValue<charcode))
            ok=false;
    }

    if (ok)
    {
        var index=0;
        var radios=group.getEl().select('input[type="radio"]',true);
        var radio=radios.item(index);
        if (!radio)
            return;

        if ((typeof(radio.dom.alt)!="undefined") && (radio.dom.alt.length))
            index=charcode;
        else
            index=charcode-1;

        var radio=radios.item(index);

        if (!radio)
            return;

        console.log(radio);

        if (radio)
        {
            console.log("Setting value of ",radio.id," to true.");
            group.setValue(radio.id,true);
            group.getEl().select('input[type="text"]').each(function(el,c,index)
            {
                el.dom.value="";
                //console.log("Cleared value from textbox "+el.dom.id);
            });
        }
    }
}

function checkboxKeypress(field,keycode,event)
{
    //console.log('+ checkboxKeypress('+field.id+','+keycode+')');
    //Get the parent checkboxgroup
    var group=field.findParentByType('checkboxgroup');
    var charcode=getNumCode(keycode);
    var checkbox=null;

    //If there is no group, then the checkbox is just a simple checkbox,
    //so we should check it
    if (!group)
    {
        field.setValue(!field.getValue());
        return;
    }
    else
    {
        //Search for the correct checkbox
        var cbEl=group.getEl().select('input[type="checkbox"]',true).item(charcode-1);
        if (cbEl)
            group.setValue(cbEl.id,!cbEl.dom.checked);
    }
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

    var qContainer=getQContainer(field.getEl());
    if (qContainer)
        setQActive(qContainer,true);

}

//Lost focus
function onFocusLost(field)
{
    if (!defined(field))
        return;

    var qContainer=getQContainer(field);
    if (qContainer)
        setQActive(qContainer,false);

    var form=field.findParentByType('form');
    if ((typeof(form)=="undefined") || (form==null))
        return;

    if (defined(form.focusedEl))
        form.focusedEl.focus();
}


function onFormShow(form)
{
    var btnSave=Ext.getCmp('btnSave');
    if (form.saved)
        btnSave.disable();
    else
        if (NRG.Forms.SessionLabel)
            btnSave.enable();

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
    //console.log('+ onFormActivated('+form.id+')');

    //Focus and highlight the appropriate element for this form
    if ((typeof(form.focusedEl)=="undefined") || (form.focusedEl==null))
    {
        form.focusedEl=Ext.select('input',false,form.getEl().dom).item(0);
        //console.log('  onFormActivated(): Searched for a new input element to highlight and found this: ',form.focusedEl)
    }

    //If the form is hidden, then we should not focus any elements yet
    if (!NRG.Forms.SessionLabel)
        return;

    if ((typeof(form.focusedEl)!="undefined") && (form.focusedEl!=null))
    {
        //console.log('  onFormActivated(): Highlighting focused element: '+form.focusedEl.id);
        form.focusedEl.focus();
        var qContainer=getQContainer(form.focusedEl);
        if (qContainer)
        {
            //console.log('  onFormActivated(): Setting container '+qContainer.id+' active for element '+form.focusedEl);
            setQActive(qContainer,true);
        }
//        else
//            console.log('  onFormActivated(): Couldn\'t find qContainer for '+form.focusedEl);
    }
    else
    {
        //console.log('  onFormActivated(): No element to highlight for form '+form.id);
    }

    if (!defined(form.radioShortcutLabels))
    {
        //Add shortcut hints to each radio element
        form.items.each(setCtShortcuts);

        form.radioShortcutLabels=true;
    }

    //Update form version display field
    if (defined(form.schema))
    {
        var verCmp=Ext.getCmp('form_version');

        if (verCmp)
            verCmp.getEl().update(form.schema);
    }
}

/** Loops through all children of 'container' and assigns shortcut labels */
function setCtShortcuts(container,index,count)
{
    switch (container.xtype)
    {
        case "radiogroup":
        case "checkboxgroup":if (!defined(container.noShortcuts))
                                 container.getEl().select('input[type=radio], input[type=checkbox]').each(addShortcutLabel);
                             //Iterate through all child containers
                             container.items.each(setCtShortcuts);break;
        default: if (container.items)
                     container.items.each(setCtShortcuts);break;
    }

    return true;
}

/** Adds a shortcut label to an input element */
function addShortcutLabel(input,scope,index)
{
    //The default shortcut is the index of the element in the list of children
    //plus 1 to correct 0-based iteration.
    var shortcut=index+1;

    if ((typeof(input.dom.alt)!="undefined") && (input.dom.alt.length))
        shortcut=input.dom.alt;

    var label='<span class="q-radio-shortcut">'+shortcut+'</span>';
    input.insertSibling(label,'before');

    return true;
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

function btnSaveClicked(button)
{
    if (!NRG.Forms.SessionLabel)
    {
        Ext.Msg.show({
            title:'Oops',
            msg:'It seems the application lost your session id and will not function correctly if allowed to continue.<br><br>I will now click the Reset button for you and cross my fingers in hope this doesn\'t happen again, ok?',
            icon:Ext.Msg.ERROR,
            buttons:Ext.Msg.OK,
            width:400,
            fn:function(){resetForms();}
        });

        return false;
    }

    var txtSID=Ext.getCmp('txtSubjectID');

    if (!txtSID.isValid())
        return false;

    var form=Ext.getCmp('tabForms').getActiveTab();

    if (!form.getForm().isValid())
    {
        highlightInvalidFields(form);
        return false;
    }

    //Retrieve an array of all the values (optionally in a specific order)
    var values=getFormValues(form.getForm(), form.submitOrder);

    //Transform the values to xml
    var xmldata=formToXml(values);

    //Disable the Save button
    button.disable();

    form.saved=true;
    
    ajaxShowWait(true);
    //Perform the save request
    Ext.Ajax.request({
        url:'ajax/saveform.php',
        method:'POST',
        params:{
                session:NRG.Forms.SessionLabel,
                schema:form.schema,
                data:xmldata
               },

        success:saveRequestSucceeded,
        failure:saveRequestFailed
    });

    return true;
}

function saveRequestSucceeded(data,request)
{
    ajaxShowWait(false);
    Ext.Msg.hide();
    var response=Ext.decode(data.responseText);

    if (response.success==1)
    {
        var form=Ext.getCmp('tabForms').getActiveTab();
        var time=Ext.fly('clock').dom.innerHTML;

        if (form.lastForm)
        {
            Ext.Msg.show({
                title:'Reset?',
                width:350,
                msg:'Congratulations! Your time was '+time+'.<br><br>Would you like to reset all forms now?',
                buttons:Ext.Msg.YESNOCANCEL,
                icon:Ext.Msg.QUESTION,
                fn:function(button){if (button=='yes') resetForms();}
            });
        }
        else
            nextForm();
        return;
    }

    Ext.getCmp('btnSave').enable();
    if (response.action)
    {
        ajaxAction(response.action,response);
        return;
    }
    
    Ext.Msg.show({
                    title:'Oops',
                    msg:response.message,
                    icon:Ext.Msg.ERROR,
                    buttons:Ext.Msg.OK
    });
}

function saveRequestFailed(form,data)
{
    ajaxShowWait(false);
    Ext.Msg.hide();
    Ext.getCmp('btnSave').enable();
    Ext.Msg.alert('Error','Oh, snap! :( We were unable to store the data.<br/>Please contact your IT department.');
}

function btnNextFormClicked(button)
{
    var currentForm=Ext.getCmp('tabForms').getActiveTab();
    if (currentForm.saved)
        nextForm();
    else
        promptSaveForm(currentForm);
}

function getNumCode(keycode)
{
    //Horizontal digit line
    var result=keycode-48;

    //Numpad
    if (result>=48)
        result-=48;

    return result;
}


function ajaxAction(action,response)
{
    switch (action)
    {
        case "refresh":
                        Ext.Msg.show({
                            title:'Bummer',
                            width:350,
                            msg:response.message,
                            icon:Ext.Msg.WARNING,
                            buttons:Ext.Msg.OK,
                            fn:function(){window.onbeforeunload=null;window.location.reload();}
                        });
                        break;
    }

}

function ajaxShowWait(yes)
{
    if (yes)
    {
        Ext.Ajax.on('beforerequest',showWait);
        Ext.Ajax.on('requestcompleted',Ext.Msg.hide);
        Ext.Ajax.on('requestexception',Ext.Msg.hide);
    }
    else
    {
        Ext.Ajax.un('beforerequest',showWait);
        Ext.Ajax.un('requestcompleted',Ext.Msg.hide);
        Ext.Ajax.un('requestexception',Ext.Msg.hide);
    }
}

function showWait()
{
    Ext.Msg.wait('Please stand by for milk and cookies ...','Loading');
}

NRG.Forms.timer={
                    run:function()
                    {
                        var now=new Date();
                        var elapsed=now.getTime()-NRG.Forms.startTime.getTime();
                        now.setTime(elapsed);
                        Ext.fly('clock').update(now.format('i:s'));
                    },
                    interval:1000
                }

function formToXml(values)
{
    var result="<form>\n";

    //console.log(values);

    for (var i=0;i<values.length;++i)
    {
        var field=values[i];
        var tag=field.name.toLowerCase().replace(/\s/g,'');

        if (!tag.length)
            continue;

        result+="\t<"+tag+">"+encodeURIComponent(field.value)+"</"+tag+">\n";
    }

    result+="</form>";

    return result;
}

////Takes a BasicForm param and an array of field names and returns a new Array
//containing the values of the form in the order specified by the array of field names
function getFormValues(form, order)
{
    var result=new Array();
    var values=form.getValues();
    var field=null;

    //No specific order? Then transform all values to an array
    if (!order)
    {
        for (field in values)
        {
            result.push({
                            name:field,
                            value:values[field]
                        });
        }
    }
    //Otherwise, only add specific values
    else
    {
        for (var i=0;i<order.length;++i)
        {
            field=order[i];
            if (typeof(field)=="undefined")
                continue;
            var name="";
            var defaultValue=NRG.Forms.NoResponse;
            var handler=null;

            //String?
            if (typeof(field)=="string")
                name=field;
            //Object?
            else
            {
                name=field.name;
                if (defined(field.defaultValue))
                    defaultValue=field.defaultValue;

                if (defined(field.handler))
                    handler=field.handler;
            }

            //console.log('Searching for field: '+name+', default: '+defaultValue);
            if (!defined(values[name]))
                values[name]=defaultValue;
            else
            {
                var value=values[name];

                //Call custom value handler, if necessary
                if (handler)
                    value=handler(value);

                values[name]=trim(value);
            }

            if (!values[name].length)
                values[name]=defaultValue;

            result.push({
                            name:name,
                            value:values[name]
                        });
        }
    }

    return result;
}

/** Makes sure that RACE_1,2,3 have values according to special rankings
 * assigned to each radio input element.
 */
function setSeqHiddenFieldsValues(prefix,checkboxgroup,checkedItems)
{
    var checked=Array();

    //Innitially, mark all hidden fields as NoResponse (to clear previous values
    var i=0;
    var f=null;
    do
    {
        ++i;
        f=Ext.getCmp(prefix+i);
        if (!f)
            break;

        f.setValue(NRG.Forms.NoResponse);
    }
    while (f);

    if ((checkboxgroup.saneCheckboxCount) && (checkedItems.length>checkboxgroup.saneCheckboxCount))
        return;

    //Retrieve inputValues by rankings or by order. Avoid mixing the two.
    for (i=0;i<checkedItems.length;++i)
    {
        //Use rankings?
        if (defined(checkedItems[i].ranking))
        {
            var ranking=checkedItems[i].ranking;
            checked[ranking]=checkedItems[i].inputValue;
        }
        else
            //No rankings, use array order
            checked[i]=checkedItems[i].inputValue;
    }

    //console.log('Checked array:',checked);

    var hidden_idx=1;
    //Loops through all these values and assigns them to prefix_{N} elements
    while (checked.length)
    {
        var val=checked.shift();
        if (!defined(val))
            continue;

        var field=Ext.getCmp(prefix+hidden_idx);

        if (!field)
        {
            //console.log('Done searching for fields. Last element: '+prefix+hidden_idx)
            break;
        }

        field.setValue(val);
        //console.log(field.id,val);
        ++hidden_idx;
     }
}

function trim(stringToTrim)
{
	return stringToTrim.toString().replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim)
{
	return stringToTrim.toString().replace(/^\s+/,"");
}
function rtrim(stringToTrim)
{
	return stringToTrim.toString().replace(/\s+$/,"");
}

