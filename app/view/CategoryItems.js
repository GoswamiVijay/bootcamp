/*
 * File: app/view/CategoryItems.js
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

Ext.define('BucketList.view.CategoryItems', {
    extend: 'Ext.dataview.List',
    alias: 'widget.categoryitems',

    config: {
        store: 'CategoryItems',
        itemTpl: [
            '{text}'
        ],
        plugins: [
            {
                autoPaging: true,
                type: 'listpaging'
            }
        ],
        listeners: [
            {
                fn: 'onListItemTap',
                event: 'itemtap'
            }
        ]
    },

    onListItemTap: function(dataview, index, target, record, e, eOpts) {
        BucketList.util.Bootcamp.addBucketItem( record);
    }

});