<?xml version="1.0" encoding="UTF-8"?>
<!-- subjectdata.xsl tabsize=4

 This is the xml stylesheet used to output the subject data in tabular form,
 for use with XmlStore (but not limited to it).
 Each <session> element is converted to a column. The rows in these columns
 depend on the labels extracted automatically from the RelaxNG schemas.

 @warning Unfortunately, one has to specify the version of each schema
          (i.e. DEM/1.4) to load (as a parameter to the "form" template), but this
          can be worked around by creating a symlink that always points to the
          latest version. Then, one only needs to update the link and everything
          else will magically load the new schema version. Because part of the
          development time is spent on Windows, symlinks aren't used by default.

 @author  Victor Petrov <victor_petrov@harvard.edu>
 @date    July 20, 2010
 @copyright (c) 2010 The Presidents and Fellows of Harvard College
 @copyright (c) 2010 The Neuroinformatics Research Group at Harvard University
 @license   GPLv3 <http://www.gnu.org/licenses/gpl-3.0.txt>
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
            <xsl:attribute name="locked">
                <xsl:value-of select="/result/final/@locked"/>
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
               <xsl:with-param name="name">DEM/1.5</xsl:with-param>
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
               <xsl:with-param name="name">HQ/1.3</xsl:with-param>
           </xsl:call-template>
            <!-- Alcohol/Tobacco/Caffeine -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">ATC/1.0</xsl:with-param>
           </xsl:call-template>
            <!-- Lifestyle -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">LIFE/1.0</xsl:with-param>
           </xsl:call-template>
            <!-- Interactions -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">INT/1.0</xsl:with-param>
           </xsl:call-template>
            <!-- Hormone/Menstrual Cycle -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">HMC/1.0</xsl:with-param>
           </xsl:call-template>
            <!-- Hollingshead Index -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">HI/1.0</xsl:with-param>
           </xsl:call-template>
            <!-- Behavior -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">BRIEF/1.0</xsl:with-param>
           </xsl:call-template>
            <!-- SCL -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">SCL/1.0</xsl:with-param>
           </xsl:call-template>
            <!-- Self-Report -->
           <xsl:call-template name="form">
               <xsl:with-param name="name">SR/1.0</xsl:with-param>
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