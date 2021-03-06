ionicApp.factory('addressService', ['Restangular', function (Restangular) {
    var res = Restangular.all('otherconstants');
    return {
        get: function (id) {
            return res.one(id).get();
        },
        queryAll: function () {
            return res.get('addressNext', {});
        },

        queryCity: function (Provinceid) {
            return res.all('addressNext').one(Provinceid.toString()).get({ 'onlyCity': 0 });
        },
        getCity: function(Provinceid){
            return res.all('addressNext').one(Provinceid.toString()).get();
        },

        queryDstrict: function (Cityid) {
            return res.all('addressNext').one(Cityid.toString()).get();
        },
        geoLocation: function (lat, lng) {
            var queryParam = {
                'lat': lat,
                'lng': lng,
            }
            return res.all('addressDetail').get('getCityIdByGeo', queryParam);
        },
        //query: function (params, parent_address_id) {
        //    var queryParam = {
        //        'parentAddressId': parent_address_id,
        //        'addressCode': address_code,
        //        'keyword': keyword,
        //        'p': params.page(),
        //        'n': params.count(),
        //        'orderBy': params.orderBy()
        //    }

        //    return res.get('address', queryParam).then(function (result) {
        //        params.total(result.page_info.items_number);
        //        return result.addresses;
        //    });
        //}
    };
}]);
ionicApp.factory('appHomeService', ['Restangular', function (Restangular) {
    var res = Restangular.all('app');
    return {
        getAppHome: function () {
            return res.get('show', { 'func': 'home' });
        },
    };

}]);
ionicApp.factory('bankService', ['Restangular', function (Restangular) {
    var res = Restangular.all('banks');
    return {
        get: function (id) {
            return res.one(id).get();
        },
        queryAll: function () {
            return res.get('bankNext', {});
        },

        query: function (params, head_bank_id, bank_address_id, keyword) {
            var queryParam = {
                'headBankId': head_bank_id,
                'bankAddressId': bank_address_id,
                'keyword': keyword,
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy()
            }

            return res.get('bank', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.banks;
            });
        },

        getBank: function (head_bank_id, bank_address_id, keyword) {
            return res.get('bank',{ 'headBankId': head_bank_id, 'bankAddressId': bank_address_id , 'keyword': keyword }).then(function(data){
                return data.banks;
            });
        },

        getSpecificBank:function(bankId){
            return res.all('bank').one(bankId.toString()).get()
        },

        findSpecificBank: function (bankId) {
            return res.get('bank', { "find": bankId });
        },

        add: function (model) {
            return res.all('bankNext').post(model);
        },
        update: function (model) {
            return res.one('bankNext', model.id).customPUT(model);
        },
        remove: function (id) {
            return res.all('bankNext').customDELETE(id);
        },
    }
}]);
ionicApp.factory('billService', ['Restangular', function (Restangular) {
    var res = Restangular.all('bills');
    return {
        get: function (id) {
            return res.one(id).get();
        },
        searchBillProduct: function (params, billTypeId, billStyleId, billStatusCode, acceptorTypeId, locationId, tradeTypeCode, billCharacterCode, billFlawId) {
            var queryParam = {
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy(),
                //'isAlive': isAlive,
                'billTypeId': billTypeId,
                'billStyleId': billStyleId,
                'billStatusCode': billStatusCode,
                'acceptorTypeId': acceptorTypeId,
                'locationId': locationId,
                'tradeTypeCode': tradeTypeCode,
                'billCharacterCode': billCharacterCode,
                'billFlawId': billFlawId
            }

            return res.get('billProduct', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.bill_products;
            });
        },
        searchBillOffer: function (params, search, publishingTimeS, publishingTimeB, billStyleId, enterpriseName, tradeLocationId) {
            var queryParam = {
                'func': 'search',
                'billStyleId': billStyleId,
                'enterpriseName': enterpriseName,
                'publishingTimeS': publishingTimeS,
                'publishingTimeB': publishingTimeB,
                'tradeLocationId': tradeLocationId,
                'billTypeId': 0,
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy(),
            }

            return res.get('billOffer', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.bill_offers;
            });
        },

        //首页获取最新报价
        getHomeBillOffer: function (func,billStyleId,n) {
            var queryParam = {
                'func': func,
                'billStyleId': billStyleId,
                'n':n,
            }
            return res.get('billOffer', queryParam).then(function (result) {
                return result.bill_offers;
            })
        },
        //首页获取最新票据
        getHomeBillProduct: function (func,billTypeId) {
            var queryParam = {
                'func': func,
                'billTypeId': billTypeId,
            }
            return res.get('billProduct', queryParam).then(function (result) {
                return result.bill_products;
            })
        },
        getOwnBillOffer: function (params, billStyleId, enterpriseName, tradeLocationId) {
            var queryParam = {
                'billStyleId': billStyleId,
                'enterpriseName': enterpriseName,
                'tradeLocationId': tradeLocationId,
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy(),
            }

            return res.get('billOffer', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.bill_offers;
            });
        },
        getOwnBillOffer: function (params, billTypeId, billStyleId, maxPrice, tradeLocationId, keyword) {
            var queryParam = {
                'p': params.page(),
                'n': params.count(),
                'keyword': keyword,
                'orderBy': params.orderBy(),
                'billTypeId': billTypeId,
                'billStyleId': billStyleId,
                'tradeLocationId': tradeLocationId,
                'maxPrice': maxPrice
            }

            return res.get('billOffer', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.bill_offers;
            });
        },
        getBillOffer: function (billOfferId) {
            return res.all('billOffer').one(billOfferId.toString()).get();
        },
        insertBillProduct: function (model) {
            return res.all('bill').post(model);
        },
        getOwnBillProduct: function (params, billTypeId, isAlive, billStatusCode) {
            var queryParam = {
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy(),
                'isAlive': isAlive,
                'billTypeId': billTypeId,
                'billStatusCode': billStatusCode,
            }

            return res.get('bill', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.bill_products;
            });
        },
        getBillDetail: function (BillId) {
            return res.all('bill').one(BillId.toString()).get();
        },
        newOrderBidding: function (model) {
            return res.all('order').post(model, { 'type': 'bidding' });
        },
        getOwnBillBidding: function (params, billTypeId, status) {
            var queryParam = {
                'p': params.page(),
                'n': params.count(),
                'billTypeId': billTypeId,
                'status': status,
            }

            return res.get('bidding', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.bill_product_biddings;
            });
        },
        getOwnBidding: function () {
            return res.get('bidding', {}).then(function (result) {
                return result.bill_product_biddings;
            });
        },

        getOrderWait: function (params) {
            var queryParam = {
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy(),
            }

            return res.get('orderWait', queryParam).then(function (result) {
                return result.bill_confirms;
            });
        },
        confirmOrderWait: function (orderConfirmId, model) {
            return res.all('orderWait').one(orderConfirmId.toString()).customPUT(model);
        },
        getBillProduct: function (billProductId) {
            return res.all('bill').one(billProductId.toString()).get();
        },
        getBillProductBidding: function (billProductId) {
            return res.all('bidding').one(billProductId.toString()).get();
        },
        insertBillBidding: function (model) {
            return res.all('bidding').post(model);
        },
        deleteBillBidding: function (id) {
            return res.all('bidding').one(id.toString()).customDELETE();
        },
        updateOwnBillOffer: function (model) {
            return res.one('billOffer', model.id).customPUT(model);
        },
        queryOfferData: function () {
            return res.get('billOffer', {}).then(function (result) {
                return result.bill_offer_rates;
            });
        },
        insertBillOffer: function (model) {
            return res.all('billOffer').post(model);
        },

        updateBillOffer: function (model) {
            return res.one('billOffer', model.id).customPUT(model);
        },
        deleteBillOffer: function (billOfferId) {
            return res.all('billOffer').customDELETE(billOfferId);
        },
        billProductElectronic: function () {
            var queryParam = {
                'billTypeId': 101,
                'func': 'home'
            }

            return res.get('billProduct', queryParam);
        },
        billProductPaper: function () {
            var queryParam = {
                'billTypeId': 102,
                'func': 'home'
            }

            return res.get('billProduct', queryParam);
        },
        billOfferPaper: function () {
            var queryParam = {
                'func': 'home'
            }

            return res.get('billOffer', queryParam);
        },

        updateBillProduct: function (billProductId, model) {
            return res.all('bill').one(billProductId.toString()).customPUT(model);
        },
        deleteBill: function (billId) {
            return res.all('bill').customDELETE(billId);
        },
        //deleteBill: function (billProductId) {
        //    return res.all('bill').customDELETE(billProductId);
        //},

        getBillsNumber: function (billTypeId) {
            return res.get('number', { 'billTypeId': billTypeId });
        },

        finishBillNew: function (billProductId) {
            return res.all('billFinish').one(billProductId.toString()).get();
        },

        getBillOfferBySelfToday: function (params) {
            var queryParam = {
                'p': params.page(),
                'n': params.count(),
            }
            return res.one("billOffer", "getBillOfferBySelfToday").get(queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.billOffers;
            });
        }
    }
}]);

ionicApp.factory('constantsService', ['Restangular', function (Restangular) {
    var res = Restangular.all('mainconstants');
    return {
        get: function (id) {
            return res.one(id).get();
        },
        queryAll: function () {
            return res.get('constant', {});
        },
        queryConstantsType: function (constant_type_id) {
            return res.get('constant', { 'constantTypeId': constant_type_id}).then(function (result) {
                return result.constants;
            });
        },
        queryAcceptorTypeforOffer: function (billStyleId) {
            return res.get('constant', { 'constantTypeId': 20, 'billStyleId': billStyleId }).then(function (result) {
                return result.constants;
            });
        },
        query: function (params, constant_type_id, keyword) {
            var queryParam = {
                'constantTypeId': constant_type_id,
                'keyword': keyword,
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy()
            }

            return res.get('constant', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.constants;
            });
        },
    }
}]);
ionicApp.factory('customerService', ['Restangular', '$interval', '$rootScope', '$state', 'localStorageService', function (Restangular, $interval, $rootScope, $state, localStorageService) {
    var res = Restangular.all('customers');
    return {
        testLogin: function () {
            return res.get('testLogin', {});
        },
        customerLogin: function (model) {
            return res.all('appCustomerLogin').post(model);
        },
        customerLoginEnterprise: function (model) {
            return res.all('customerLoginEnterprise').post(model);
        },
        //閫�鍑虹櫥褰曞姛鑳斤紝閫�鍑哄悗璺宠浆鍒扮綉绔欓椤�
        logout : function () {
            res.all('customerLogout').post().then(function () {
                localStorageService.put('customer', null);
                $rootScope.identity = null;
                Restangular.setDefaultHeaders({});
                $state.go('app.user');
            });
        },
        //鍙戦�侀獙璇佺爜,鎶借薄
        getVerify: function (phone, model, verifyStr, disableVerifyStr) {
            if (model[disableVerifyStr])
                return;
            if (!phone || phone.length != 11) {
                swal('璇疯緭鍏ユ纭殑鎵嬫満鍙风爜锛�');
                return;
            }

            res.all('phoneVerify').one(phone.toString()).get().then(function () {
                swal('楠岃瘉鐮佸凡鍙戦��');
                model[verifyStr + 'Second'] = 90;
                model[disableVerifyStr] = true;

                $interval(function () {
                    model[verifyStr] = model[verifyStr + 'Second'] + "绉掑悗鍙噸鏂拌幏鍙�";
                    model[verifyStr + 'Second']--;

                    if (model[verifyStr + 'Second'] <= 0) {
                        model[verifyStr] = "閲嶆柊鑾峰彇楠岃瘉鐮�";
                        model[disableVerifyStr] = false;
                    }
                }, 1000, 90);
            })
        },
        customerLogout: function () {
            return res.all('customerLogout').post();
        },
        phoneVerify: function (phone) {
            return res.all('phoneVerify').one(phone.toString()).get();
        },
        customerPhone: function(data){
            return res.one('customerPhone').customPUT(data);
        },
        customerReg: function (model) {
            return res.all('customerReg').post(model);
        },
        customerPasswordReset: function (phone, model) {
            return res.customPUT(model, 'customerPasswordReset', { 'phone': phone, 'r': 2 });
        },
        customerPasswordResets: function (phone, model) {
            return res.customPUT(model, 'customerPasswordReset', { 'phone': phone, 'r': 1 });
        },
        customerModifyPassword: function (model) {
            return res.one('customerPassword').customPUT(model);
        },
        
        getAllCustomerAddress: function () {
            return res.get('customerAddress', {});
        },
        getCustomerAddress: function (customerAddressId) {
            return res.all('customerAddress').one(customerAddressId.toString()).get();
        },
        addAddress: function (model) {
            return res.all('customerAddress').post(model);
        },
        updateAddress: function (model) {
            return res.one('customerAddress', model.id).customPUT(model);
        },
        updateAddressDefault: function(data){
            return res.one('customerAddress').customPUT({}, data.id, { 'func': 'default' });
        },

        removeAddress: function (id) {
            return res.all('customerAddress').customDELETE(id);
        },
        getAllEnterpriseAccount: function (accountTypeCode) {
            return res.get('enterpriseAccount', { 'accountTypeCode': accountTypeCode });
        },
        getEnterpriseAccount: function(accountId){
            return res.all('enterpriseAccount').one(accountId.toString()).get();
        },
        getAllEnterprise: function () {
            return res.get('enterprise', {});
        },
        getEnterprise: function (enterpriseId) {
            return res.all('enterprise').one(enterpriseId.toString()).get();
        },
        insertEnterprise: function (model) {
            return res.all('enterprise').post(model);
        },
        updateEnterprise: function (model) {
            return res.one('enterprise').customPUT(model);
        },
        deleteEnterprise: function (enterpriseId) {
            return res.all('enterprise').customDELETE(enterpriseId);
        },
        updateEnterpriseDefault: function (data) {
            return res.one('enterpriseAccount').customPUT({}, data.id, { 'func': 'default' });
        },

        updateEnterpriseCredential: function (model) {
            return res.one('enterpriseCredential', model.id).customPUT(model);
        },
        
        sendCustomerReview:function(){
            return res.one('customerReview').post();
        },

        getEnterpriseMember: function () {
            return res.get('enterpriseMember', {});
        },
        insertEnterpriseMember: function (model) {
            return res.all('enterpriseMember').post(model);
        },
        deleteEnterpriseMember: function (operater) {
            return res.all('enterpriseMember').customDELETE(operater.remove_phone_number, { 'code': operater.operator_phone_number_code });
        },
        insertEnterpriseAccount: function (model) {
            return res.all('enterpriseAccount').post(model);
        },
        updateWnterpriseAccount: function(model){
            return res.all('enterpriseAccount').one(model.id.toString()).customPUT(model);
        },
        deleteEnterpriseAccount: function (enterpriseId) {
            return res.all('enterpriseAccount').customDELETE(enterpriseId);
        },

        getCustomer: function () {
            return res.get('customer', {});
        },
        updateCustomer: function (model) {
            return res.one('customer').customPUT(model);
        },
        verify: function (id, verify_string) {
            return res.one('enterpriseAccountCheck', id.toString()).customPUT({ 'verify_string': verify_string }, '', { 'func': 'auto' });
        },
        enterpriseDetail: function (keyword, isSimple) {
            return res.get("enterpriseDetail", { 'isSimple': isSimple, 'keyword': keyword });
        },
        testPhoneNumber: function (phone) {
            return res.get("testPhoneNumber", { 'phone': phone });
        },
        followEnterprise: function (model) {
            return res.all("myAttention").all("saveOrUpdateCollectionEnterprise").post(model)
        },
        getAllFollowEnterprises: function (params) {
            var queryParam = {
                'p': params.page(),
                'n': params.count(),
            }
            return res.one("myAttention", "getAllCollectionEnterprises").get(queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.customerCollections;
            });
        },
        followBill: function (model) {
            return res.all("myAttention").all("saveOrUpdateCollectionBill").post(model)
        },
        getAllFollowBills: function (params) {
            var queryParam = {
                'p': params.page(),
                'n': params.count(),
            }
            return res.one("myAttention", "getAllCollectionBills").get(queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.customerCollections;
            });
        },
        getMyTasks: function (params) {
            var queryParam = {
                'p': params.page(),
                'n': params.count(),
            }
            return res.one("appCustomerTasks", "getMyTasks").get(queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.taskBills;
            });
        }
    }
}]);

ionicApp.factory('enterprisesService', ['Restangular', function (Restangular) {
    var res = Restangular.all('enterprises');
    return {
        //璇勪环
        insertAppraisal: function (model) {
            return res.all('enterpriseAppraisal').post(model);
        },
        //getAppraisal1:function(model){
        //    return res.one('enterpriseAppraisal?p=1&n=2&star=&func=mine').post(model);
        //},
        //getAppraisal2: function (model) {
        //    return res.one('enterpriseAppraisal?p=1&n=2&star=&func=tome').post(model);
        //},
        //杩藉姞璇勪环
        updateAppraisal: function (model) {
            return res.all('enterpriseAppraisal').one('enterpriseAppraisalId').post(model);
        },
        //getAppraisal: function (model) {
        //    return res.one('enterpriseAppraisal?p=1&n=2&star=&func=tome').post(model);
        //},
        getorderAppraisal: function(billtypeid, orderid){
           var queryParam = {
               'typeId': billtypeid,
               'toId': orderid,
               'func': 'show',
           }
            
            return res.get('enterpriseAppraisal', queryParam).then(function(data){
                return data;
            })
        },
     
    }
}]);



ionicApp.factory('fileService', ['Restangular', function (Restangular) {
    var res = Restangular.all('files');
    return {
        getFileById: function (fid) {
            return res.all('file').one(fid.toString()).get();
        }
    }
}]);

ionicApp.factory('myBillService', ['Restangular', function (Restangular) {
    var res = Restangular.all('bills');
    return {
        get: function (id) {
            return res.one(id).get();
        },
        //queryAll: function () {
        //    return res.get('bill', {}).then(function (result) {
        //        return result.bill_products;
        //    });
        //},
        //bill_status_code, acceptor_type_id, bill_character_code, product_location_id, trade_type_code,
        query: function (params, bill_deadline_time, bill_type_id, bill_style_id, keyword) {
            var queryParam = {
                'bdeadline_time': bill_deadline_time,
                'billTypeId':bill_type_id,
                'billStyleId': bill_style_id,
                //'billStatusCode': bill_status_code,
                //'acceptorTypeId': acceptor_type_id,
                //'billCharacterCode': bill_character_code,
                //'locationId': product_location_id,
                //'tradeTypeCode': trade_type_code,
                //'isValid': isValid,
                'keyword': keyword,
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy()
            }

            return res.get('bill', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.bill_products;
            });
        },
        //add: function (model) {
        //    return res.all('billProduct').post(model);
        //},
        //update: function (model) {
        //    return res.one('billProduct', model.id).customPUT(model);
        //},
        //remove: function (id) {
        //    return res.all('billProduct').customDELETE(id);
        //},
        //login: function (loginRequest) {
        //    return res.all('Login').post(loginRequest);
        //},
        //updateUserInfo: function (user) {
        //    return res.all('UpdateUserInfo').post(user);
        //},
        //updatePassword: function (oldPassword, newPassword) {
        //    return res.all('UpdatePassword').post(
        //        {
        //            'oldPassword': oldPassword,
        //            'newPassword': newPassword,
        //        });
        //},
        //resetPassword: function (userID) {
        //    return res.get('ResetPassword', { 'userID': userID });
        //}
    }
}]);



ionicApp.factory('notisService', ['Restangular', function (Restangular) {
    var res = Restangular.all('notis');
    return {
        getNotification: function (params, type, time1, time2, isRead) {
            var queryParam = {
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy(),
                'type': type,
                'time1': time1,
                'time2': time2,
                'isRead': isRead,
            }
            return res.get('notification', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.notifications;
            });
        },
        seeNotification: function (notificationId) {
            return res.all('notification').one(notificationId.toString()).get();
        },
        deleteNotification: function (notificationId) {
            return res.all('notification').one(notificationId.toString()).customDELETE();
        }
    }
}]);

ionicApp.factory('orderService', ['Restangular', function (Restangular) {
    var res = Restangular.all('orders');
    return {
        get: function (id) {
            return res.one(id).get();
        },
        orderCount: function () {
            return res.get('orderCount', {});
        },
        getOwnOrderDrawer: function (params) {
            var queryParam = {
                'role': 'drawer',
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy()
            }

            return res.get('order', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.orders;
            });
        },
        getOwnOrderReceiver: function (params) {
            var queryParam = {
                'role': 'receiver',
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy()
            }

            return res.get('order', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.orders;
            });
        },
        getOwnOrder: function (params, billTypeId, status) {
            var queryParam = {
                'billTypeId': billTypeId,
                'status': status,
                'role': 'drawer',
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy()
            }

            return res.get('order', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.orders;
            });
        },
        getOwnBiddingOrder: function (params, billTypeId, status) {
            var queryParam = {
                'billTypeId': billTypeId,
                'status': status,
                'role': 'receiver',
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy()
            }

            return res.get('order', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.orders;
            });
        },
        getOrder: function (orderId) {
            return res.all('order').one(orderId.toString()).get();
        },
        orderPayCommission: function (orderId) {
            return res.all('orderCommission').one(orderId.toString()).put();
        },
        orderPay: function (orderId, model) {
            return res.all('orderPay').one(orderId.toString()).customPUT(model);
        },
        updateOrderReceiver: function (orderId, model) {
            return res.all('orderReceiver').one(orderId.toString()).customPUT(model);
        },
        orderPayNew: function (orderId, orderPayTypeId, phone_number, verifyCode) {
            return res.all('orderPay').one(orderId.toString()).get({ 'orderPayTypeId': orderPayTypeId, 'phone': phone_number, 'verifyCode': verifyCode });
        },
        //orderPay: function (orderId) {
        //    return res.all('orderPay').all('temp').one(orderId.toString()).get();
        //},
        //orderPayConfirm: function (orderId) {
        //    return res.all('orderPayConfirm').all('temp').one(orderId.toString()).get();
        //},
        orderEndorsement: function (orderId, model) {
            return res.all('orderEndorsement').one(orderId.toString()).customPUT(model);
        },
        getOrderEndorsement: function (orderId) {
            return res.all('orderEndorsement').one(orderId.toString()).get();
        },
        deleteOrderEndorsement: function (orderId) {
            return res.all('orderEndorsement').one(orderId.toString()).remove();
        },
        orderLogistics: function (orderLogisticId, model) {
            return res.all('orderLogistic').one(orderLogisticId.toString()).customPUT(model);
        },
        orderConfirm: function (orderId, token) {
            return res.all('orderConfirm').one(orderId.toString()).get({ 'token': token });
        },
        orderFinish: function (orderId) {
            return res.all('orderFinish').one(orderId.toString()).get();
        },
        orderAppraisal: function (orderId, model) {
            return res.all('orderAppraisal').one(orderId.toString()).customPUT(model);
        },
        getOrderRunning: function (role) {
            var queryParam = {
                'func': 'count',
                'role': role
            }

            return res.get('order', queryParam);
        },
        updateOrderAccountReceiver: function (orderId, receiver_account_id) {
            return res.all('orderAccount').customPUT({ 'receiver_account_id': receiver_account_id }, orderId, { 'func': 'receiver' });
        },
        updateOrderAccountDrawer: function (orderId, drawer_account_id) {
            return res.all('orderAccount').customPUT({ 'drawer_account_id': drawer_account_id }, orderId, { 'func': 'drawer' });
        },
    }
}]);

ionicApp.factory('payingService', ['Restangular', function (Restangular) {
    var res = Restangular.all('paying');
    return {
        payByAlipay: function (recharge_price) {
            return res.all('orderLogistic').one(orderLogisticId.toString()).customPUT({ 'recharge_price': recharge_price });
        },
        platformAccountBalance: function (params, changeType) {
            var queryParam = {
                'changeType': 1,
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy(),
            }

            return res.get('platformAccountBalance', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.balance_changes;
            });
        },
        recharge: function (recharge_price) {
            return res.all('recharge').customPUT({ 'recharge_price': recharge_price });
        },
        GetPlatformAccount: function () {
            return res.one('platformAccount').get();
        },
        bfapi: {
            queryBalance: function (p, n) {
                var queryParam = {
                    'type': 3,
                    'p': p,
                    'n': n,
                    'orderBy': '-id',
                    'status': 1,
                }
                return res.all('bfapi').get('queryBalance', queryParam);
            }
        },
        //bindingAgentTreasurer: function (enterpriseId, model) {
        //    return res.all('xingyeapi').one('bindingAgentTreasurer').one(enterpriseId.toString()).post(model);
        //},
        openAccount: function (enterpriseId, model) {
            return res.all('xingyeapi').one('xingYeOpenAccount').one('openAccount').all(enterpriseId.toString()).post(model);
        },
        checkAccount: function (enterpriseId, amt, isDefault, accountTypeCode) {
            var queryParam = {
                'amt': amt,
                'isDefault': isDefault,
                'accountTypeCode': accountTypeCode
            }
            return res.all('xingyeapi').one('xingYeOpenAccount').one('checkAccount').all(enterpriseId.toString()).post(queryParam)
        },
        getAccount: function (enterpriseId) {
            return res.all('xingyeapi').one('account').one('getAccount').one(enterpriseId.toString()).get();
        },
        //econtractRegister: function (enterpriseId, model) {
        //    return res.all('xingyeapi').one('econtract').one('register').all(enterpriseId.toString()).post(model);
        //},
        econtractFirstSign: function (fromEnterpriseId, fromKeyWord) {
            return res.all('xingyeapi').one('econtract').one('firstSign').all(fromEnterpriseId.toString()).post({ 'fromKeyWord': fromKeyWord });
        },
        econtractNextSign: function (toEnterpriseId, toKeyWord, orderId) {
            return res.all('xingyeapi').one('econtract').one('nextSign').all(toEnterpriseId.toString()).post({ 'toKeyWord': toKeyWord, 'orderId': orderId });
        },
        postAgentTreasurer: function (enterpriseId, model) {
            return res.all('xingyeapi').one('insertAgentTreasurer').all(enterpriseId.toString()).post(model);
        },
        updateAgentTreasurer: function (enterpriseId, model) {
            return res.all('xingyeapi').one('updateAgentTreasurer').one(enterpriseId.toString()).customPUT(model);
        },
        getAgentTreasurer: function (enterpriseId) {
            return res.all('xingyeapi').one('selectAgentTreasurer').one(enterpriseId.toString()).get();
        }

    };
}]);
ionicApp.factory('portalService', ['Restangular', function (Restangular) {
    var res = Restangular.all('portals');
    return {
        lastInformation: function (type) {
            var queryParam = {
                'informationTypeId': type,
                'p': 1,
                'n': 5,
                'orderBy': '-publishing_time'
            }

            return res.get('information', queryParam).then(function (result) {
                return result.portal_information;
            });
        },
        queryInformation: function (type) {
            var queryParam = {
                'informationTypeId': type,
                'p': 1,
                'n': 100,
                'orderBy': '-publishing_time'
            }

            return res.get('information', queryParam).then(function (result) {
                return result.portal_information;
            });
        },
        getInformation: function (id) {
            return res.all('information').one(id.toString()).get();
        },
        getInformationType: function (id) {
            return res.all('informationType').one(id.toString()).get();
        }
    };
}]);
ionicApp.factory('portalSuggestionService', ['Restangular', function (Restangular) {
    var res = Restangular.all('portals');
    return {
        get: function (id) {
            return res.one(id).get();
        },
        queryAll: function () {
            return res.get('suggestion', {});
        },

        query: function (params, suggestionType_id, handleStatusCode, keyword) {
            //if (suggestionType_id == null) {
            //    suggestionType_id = 1;
            //}
            var queryParam = {
                'suggestionTypeId': suggestionType_id,
                'handleStatusCode': handleStatusCode,
                'keyword': keyword,
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy()
            }

            return res.get('suggestion', queryParam).then(function (result) {
                if (result != null) {
                    params.total(result.page_info.items_number);
                    return result.portal_suggestions;
                } else return null;

            });
        },

        add: function (model) {
            return res.all('suggestion').post(model);
        },
        update: function (model, modell) {

            if (modell.is_suggest_person_accept == "1") {
                modell.is_suggest_person_accept = 1;
            } else modell.is_suggest_person_accept = 0;

            return res.one('suggestion', model.id).customPUT(modell);
        },
       
    }
}]);
ionicApp.factory('queryBillService', ['Restangular', function (Restangular) {
    var res = Restangular.all('bills');
    return {
        get: function (id) {
            return res.one(id).get();
        },
        //queryAll: function () {
        //    return res.get('billProduct', {}).then(function (result) {
        //        return result.bill_products;
        //    });
        //},
        //queryBillProduct: function (ProductId) {
        //    return res.get('billProduct' + '/' + ProductId);
        //},
        query: function (params, bill_style_id, bill_status_code, acceptor_type_id, bill_character_code, product_location_id, trade_type_code, keyword) {
            var queryParam = {
                'billStyleId': bill_style_id,
                'billStatusCode': bill_status_code,
                'acceptorTypeId': acceptor_type_id,
                'billCharacterCode': bill_character_code,
                'locationId': product_location_id,
                'tradeTypeCode': trade_type_code,
                //'isValid': isValid,
                'keyword': keyword,
                'p': params.page(),
                'n': params.count(),
                'orderBy': params.orderBy()
            }

            return res.get('billProduct', queryParam).then(function (result) {
                params.total(result.page_info.items_number);
                return result.bill_products;
            });
        },
        //add: function (model) {
        //    return res.all('billProduct').post(model);
        //},
        //update: function (model) {
        //    return res.one('billProduct', model.id).customPUT(model);
        //},
        //remove: function (id) {
        //    return res.all('billProduct').customDELETE(id);
        //},
        //login: function (loginRequest) {
        //    return res.all('Login').post(loginRequest);
        //},
        //updateUserInfo: function (user) {
        //    return res.all('UpdateUserInfo').post(user);
        //},
        //updatePassword: function (oldPassword, newPassword) {
        //    return res.all('UpdatePassword').post(
        //        {
        //            'oldPassword': oldPassword,
        //            'newPassword': newPassword,
        //        });
        //},
        //resetPassword: function (userID) {
        //    return res.get('ResetPassword', { 'userID': userID });
        //}
    }
}]);

ionicApp.factory('toolService', ['Restangular', function (Restangular) {
    var res = Restangular.all('tools');
    return {
        interestRate: function () {
            return res.get('interestRate', {});
        },
        priceTrend: function () {
            return res.get('priceTrend', {});
        },
        calculator: function (model, func) {
            var param = {};
            if (func)
                param['func'] = func;
            return res.all("calculator").post(model, param);
        },
        searchCalendar: function (year, month, billTypeId, number) {
            var queryParam = {
                'year': year,
                'month': month,
                'billTypeId': billTypeId,
                'number': number
            }
            return res.get('calendar', queryParam).then(function (data) {
                return data;
            });
        },
        getStars: function (enterpriseId) {
            return res.all('star').one(enterpriseId.toString()).get();
        },
        setStars: function (product) {
            return res.all('star').one(product.publisher_id.toString()).get().then(function (data) {
                product.star = data;
            });
        },
        setStars2: function (product) {
            return res.all('star').one(product.enterprise_id.toString()).get().then(function (data) {
                product.star = data;
            });
        },
        isCalendarSpecial: function (day_str) {
            return res.get('calendar', { 'date': day_str });
        },
        serviceByPublication: function (billNumber) {
            return res.get('serviceByPublication', billNumber);
        }
    }
}]);
