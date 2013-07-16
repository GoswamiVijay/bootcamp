Ext.define('BucketList.util.Bootcamp', {
	singleton: true,
	server: 'http://api.bc7.us',
	requires: ['Ext.MessageBox'],
	openCategoryItems: function(dataview, index) {
		// get the store associated with this dataview
		var st = dataview.getStore();

		// get the Ext.data.Model object associated with the selected item
		// index is the row number of the item that the user tapped on,
		//		which also corresponds with the row number in the store
		var mod = st.getAt(index);

		// get a reference to the store that loads the items for this category
		var categItemStore = Ext.getStore('CategoryItems');

		// the proxy expects the category ID in the parameter "catid"
		// get the "id" field of the chosen Model, and pass it in parameter "catid"
		categItemStore.getProxy().setExtraParam('catid', mod.get('id'));
		categItemStore.currentPage = 1;

		// Then, load the records
		categItemStore.load();

		// get a reference to the "navigationview" xtype which contains this dataview
		var nv = dataview.up('navigationview');

		// push the screen with the xtype "categoryitems" into the 
		//		navigation view
		nv.push({
			xtype: 'categoryitems',
			title: mod.get('name')
		});
	},
	setHeader: function(token) {
		// Set this as a default header
		// This header will get sent down with every request
		Ext.Ajax.setDefaultHeaders({
			Authorization: token
		});
		// Save token in local storage
		localStorage.setItem('sessiontoken', token);
	},
	setTabPanelActiveTab: function(tabIndex) {
		var pn = Ext.ComponentQuery.query('tabpanel')[0];
		if (pn) {
			pn.setActiveItem(tabIndex);
		}
	},
	loadSessionToken: function() {
		var sessionToken = localStorage.getItem('sessiontoken');
		if (sessionToken) {
			// we're already logged in
			// set authorization header
			Ext.Ajax.setDefaultHeaders({
				Authorization: sessionToken
			});
		}
	},
	loginSubmit: function(button) {
		var fpan = button.up('formpanel');
		fpan.submit({
			url: BucketList.util.Bootcamp.server+'/bc/login',
			method: 'POST',
			success: function(form, result) {
				Ext.Msg.alert('Login', result.message);
				if (result.token) {
					BucketList.util.Bootcamp.setHeader(result.token);
					BucketList.util.Bootcamp.setTabPanelActiveTab(0);
				}
			},
			failure: function(form, result) {
				Ext.Msg.alert('Login failed', result.message);
			}
		});
	},
	createAccountSubmit: function(button) {
		var form = button.up('formpanel');
		form.submit({
			url: BucketList.util.Bootcamp.server+'/bc/createuser',
			method: 'POST',
			success: function(form, result) {
				Ext.Msg.alert('Create Account', result.message);
				if (result.token) {
					BucketList.util.Bootcamp.setHeader(result.token);
					BucketList.util.Bootcamp.setTabPanelActiveTab(0);
				}
			},
			failure: function(form, result) {
				Ext.Msg.alert('Create Account failed', result.message);
			}
		});
	},
	showMyItems: function() {
		Ext.getStore('MyItems').load(function(records, operation, success) {
			if (!success) {
				Ext.Msg.alert('Load',
					'Unable to load your bucket items. Please make sure you\'re logged in before loading this page',
					BucketList.util.Bootcamp.setTabPanelActiveTab(2));
			}
		});
	},
	addBucketItem: function(record) {
		var bucketid = record.get('id');

		Ext.Ajax.request({
			url: BucketList.util.Bootcamp.server+'/bc/addbucketitem',
			method: 'POST',
			params: {
				bucketid: bucketid
			},
			callback: function(options, success, response) {
				result = JSON.parse(response.responseText);
				Ext.Msg.alert('Add Bucket Item', result.message);
			}
		});
	},
	removeBucketItem: function(record) {
		var bucketid = record.get('id');

		Ext.Msg.confirm('Delete',
			'Are you sure you want to delete this item from your bucket list?',
			function(buttontext) {
				if (buttontext === 'yes') {
					Ext.Ajax.request({
						url: BucketList.util.Bootcamp.server+'/bc/deletebucketitem',
						params: {
							bucketid: bucketid
						},
						method: 'POST',
						success: function(response) {
							BucketList.util.Bootcamp.showMyItems();
						},
						failure: function(response) {
							result = JSON.parse(response.responseText);
							Ext.Msg.alert('Delete Bucket Item failed', result.message);
						}
					});
				}
			}
		);
	}
});