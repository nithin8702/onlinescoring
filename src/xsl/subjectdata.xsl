<?xml version="1.0" encoding="UTF-8"?>
<!-- This stylesheet converts the subject data from hierarchical XML format to
     tabular XML format with a repeating <row> element.
 -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="xml"/>
    <xsl:variable name="lc" select="'abcdefghijklmnopqrstuvwxyz'" />
    <xsl:variable name="uc" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />

    <!-- Calls the FORM template with different parameters, thus preserving the
         order in which form data are output -->

    <xsl:template match="/">
        <result>
            <xsl:attribute name="subject">
                <xsl:value-of select="/result/@subject"/>
            </xsl:attribute>
            <xsl:call-template name="columns"/>
            <xsl:call-template name="rows"/>
        </result>
    </xsl:template>

    <!-- Output column headers -->
    <xsl:template name="columns">
        <columns>
            <xsl:for-each select="/result/session">
                <column>
                    <xsl:attribute name="owner">
                        <xsl:value-of select="@owner"/>
                    </xsl:attribute>
                    <xsl:attribute name="date">
                        <xsl:value-of select="@date"/>
                    </xsl:attribute>
                </column>
            </xsl:for-each>
        </columns>
    </xsl:template>

    <!-- Output all rows -->
    <xsl:template name="rows">
        <rows>
            <!-- Ethnicity / Handedness -->
            <xsl:call-template name="form">
                <xsl:with-param name="name">EH/1.0</xsl:with-param>
            </xsl:call-template>
            <!-- Demographics -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">DEM/1.4</xsl:with-param>
           </xsl:call-template>
            <!-- Education -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">EDU/1.0</xsl:with-param>
           </xsl:call-template>
            <!-- Occupation -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">OCCU/1.1</xsl:with-param>
           </xsl:call-template>
            <!-- Health -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">HQ/1.1</xsl:with-param>
           </xsl:call-template>
            <!-- Alcohol/Tobacco/Caffeine -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">ATC/1.0</xsl:with-param>
           </xsl:call-template>
        </rows>
    </xsl:template>

    <!-- Handles a specific form, such as DEM, EH, HQ, etc. This template opens
         the schema file and selects the names of all <element>'s.
         It creates the first column: the <field> element.
         Then it traverses all sessions and creates a new <column> element with the value
         of <field> from every submitted form data.-->
    <xsl:template name="form">
        <xsl:param name="name"/>
        <xsl:variable name="elements" select="document(concat('../schemas/',$name,'.rng.xml'))/*[name()='grammar']/*[name()='start']/*[name()='element' and @name='form']/*[name()='element']/@name"/>
        <xsl:variable name="schemaName" select="substring-before($name,'/')"/>
        <!-- Keep a pointer to the <session> elements, to iterate over later -->
        <xsl:variable name="sessions" select="/result/session"/>
        <xsl:variable name="final" select="/result/final/data"/>

        <!-- Parse each schema element found -->
        <xsl:for-each select="$elements">
            <!-- yob/eng_age/etc... -->
            <xsl:variable name="field" select="."/>
            <xsl:variable name="fieldName" select="concat($schemaName,'_',translate($field,$lc,$uc))"/>

            <!-- Create a new row -->
            <row>
                <xsl:attribute name="field">
                    <xsl:value-of select="$fieldName"/>
                </xsl:attribute>
<!--  -->
                <final>
                    <xsl:value-of select="$final/*[name()=$fieldName]/text()"/>
                </final>

                <!-- Append a column for every session available. -->
                <xsl:for-each select="$sessions">
                    <cell>
                        <xsl:attribute name="formID">
                            <xsl:value-of select="form/@id"/>
                        </xsl:attribute>

                        <!-- Print the value of the field from the session data -->
                        <xsl:value-of select="form[starts-with(@schema,$schemaName)]/*[name()=$field]/text()"/>
                    </cell>
                </xsl:for-each>
            </row>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>