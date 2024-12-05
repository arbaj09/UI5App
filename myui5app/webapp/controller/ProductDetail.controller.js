sap.ui.define([
    "sap/ui/core/mvc/Controller",
 
     "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("myui5app.controller.ProductDetail", {
                      onInit: function() {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteProductDetail").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function(oEvent) {
                const iProductId = oEvent.getParameter("arguments").productId;
                const oView = this.getView();
                oView.bindElement({
                    path: "/Products(" + iProductId + ")",
                    parameters: {
                        expand: "Supplier,Category"
                    },
                    events: {
                        dataRequested: function() {
                            oView.setBusy(true);
                        },
                        dataReceived: function() {
                            oView.setBusy(false);
                        }
                    }
                });
            },

            addToCart: function (oEvent) {
                MessageToast.show("Added to cart");
            },
            
            markAsFav: function (oEvent) {
                const oButton = oEvent.getSource();
                if (oButton.getIcon() === "sap-icon://unfavorite") {
                    oButton.setIcon("sap-icon://favorite");
                    MessageToast.show("Added to favorites");
                    return;
                }
            
                oButton.setIcon("sap-icon://unfavorite");
                MessageToast.show("Removed from favorites");
            },

            trimSuperfluousBytes: function (sVal) { // background info https://blogs.sap.com/2017/02/08/displaying-images-in-sapui5-received-from-the-northwind-odata-service/
                if (typeof sVal === "string") {
                    const sTrimmed = sVal.substring(104);
                    return "data:image/bmp;base64," + sTrimmed;
                }
                return sVal;
            }
            
        });
    });
