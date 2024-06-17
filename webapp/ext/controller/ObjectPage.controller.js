sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension',
	"sap/ui/mdc/p13n/StateUtil",
	"sap/suite/ui/generic/template/extensionAPI/extensionAPI"
], function (ControllerExtension, StateUtil, ExtensionAPI) {
	'use strict';

	return ControllerExtension.extend('project1.ext.controller.ObjectPage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf project1.ext.controller.ObjectPage
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel(),
					oRouter = this.base.getExtensionAPI().getRouting();
				this.oStateUtil = StateUtil;

				// debugger;
				// ExtensionAPI.getExtensionAPIPromise(this.getView()).then(function (oExtensionAPI) {
				// 	oExtensionAPI.attachPageDataLoaded(function (event) {
				// 		var sPath = event.context.sPath;  // get the path
				// 		console.log(sPath);
				// 		var oData = event.context.getModel().getProperty(sPath); // get the data to use further
				// 		console.log(oData)
				// 		// write rest of your code here ! happy coding!

				// 	}.bind(this));
				// }.bind(this))

				oRouter.attachonAfterBinding(function (oContext) {
					// debugger;
					// this.handlePageBinding(oContext);
					var oTable = this.getView().byId("fe::table::Products::LineItem::Products"),
						oCurState = oTable.getCurrentState();
					this.getView().setBusy(true);
					oCurState.items = [];
					this.oStateUtil.applyExternalState(this.getView().byId("fe::table::Products::LineItem::Products"), oCurState);
					setTimeout(function () {
						// debugger;
						var iCategoryID = this.base.getExtensionAPI().getBindingContext().getObject().CategoryID,
							oTable = this.getView().byId("fe::table::Products::LineItem::Products"),
							oCurState = oTable.getCurrentState(),
							i, j, bEditFlag = false,
							oConfig = this.base.getExtensionAPI().getModel("config").getData()[iCategoryID];
						// debugger;
						// for (i in oCurState.items) {
						// 	// debugger;
						// 	for (j in oConfig) {
						// 		if ((oCurState.items[parseInt(i)].key === oConfig[parseInt(j)].key) && (oConfig[parseInt(j)].visible)) {
						// 			// oCurState.items[parseInt(i)].visible = true;
						// 			bEditFlag = true;
						// 		} else {
						// 			bEditFlag = false;
						// 			// oCurState.items[parseInt(i)].visible = true;
						// 		}
						// 		oCurState.items[parseInt(i)].visible = bEditFlag;
						// 	}
						// }
						oCurState.items = oConfig ? oConfig : [];
						// debugger;
						this.oStateUtil.applyExternalState(this.getView().byId("fe::table::Products::LineItem::Products"), oCurState);
						this.getView().setBusy(false);
					}.bind(this), 1000);
				}.bind(this));

				// setTimeout(function () {
				// 	var iCategoryID = this.base.getExtensionAPI().getBindingContext().getObject().CategoryID,
				// 		oTable = this.getView().byId("fe::table::Products::LineItem::Products"),
				// 		oCurState = oTable.getCurrentState(),
				// 		i, j,
				// 		oConfig = this.base.getExtensionAPI().getModel("config").getData()[iCategoryID];
				// 	// debugger;
				// 	for (i in oCurState.items) {
				// 		// debugger;
				// 		for (j in oConfig) {
				// 			if (oCurState.items[parseInt(i)].key === oConfig[parseInt(j)].key) {
				// 				oCurState.items[parseInt(i)].visible = oConfig[parseInt(j)].visible;
				// 			}
				// 		}
				// 	}
				// 	debugger;
				// 	this.oStateUtil.applyExternalState(this.getView().byId("fe::table::Products::LineItem::Products"), oCurState);
				// }.bind(this), 2000);

				// this.extensionAPI.attachPageDataLoaded(function(oData) {
				// 	var oContextObj = oData.context.getObject();
				// });
			}/*,

			onAfterRendering: function () {
				debugger;
				var iCategoryID = this.base.getExtensionAPI().getBindingContext().getObject().CategoryID,
					oTable = this.getView().byId("fe::table::Products::LineItem::Products"),
					oCurState = oTable.getCurrentState();

				console.log({
					iCategoryID: iCategoryID,
					oCurState: oCurState
				});
			}

			// handlePageBinding: function (oContext) {
			// 	console.log(oContext);
			// }
			*/
		}
	});
});
