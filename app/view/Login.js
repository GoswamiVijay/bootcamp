/*
 * File: app/view/Login.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('BucketList.view.Login', {
    extend: 'Ext.form.Panel',
    alias: 'widget.login',

    config: {
        itemId: 'login',
        layout: {
            align: 'center',
            type: 'vbox'
        },
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Login'
            },
            {
                xtype: 'fieldset',
                maxWidth: 500,
                width: '90%',
                title: 'Sign In',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'ID',
                        labelWidth: '40%',
                        name: 'loginid'
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Password',
                        labelWidth: '40%',
                        name: 'password',
                        placeHolder: 'last 4 of phone #'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'login',
                ui: 'round',
                width: 120,
                text: 'Log In'
            },
            {
                xtype: 'fieldset',
                margin: '50 0 0 0',
                maxWidth: 500,
                width: '90%',
                instructions: 'Screen name is visible to everyone',
                title: 'Create Account',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'ID',
                        labelWidth: '40%',
                        name: 'newloginid'
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Password',
                        labelWidth: '40%',
                        name: 'newpassword',
                        placeHolder: 'last 4 of phone #'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Screenname',
                        labelWidth: '40%',
                        name: 'newscreenname'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'createaccount',
                margin: 20,
                ui: 'round',
                width: 180,
                text: 'Create Account'
            }
        ]
    }

});