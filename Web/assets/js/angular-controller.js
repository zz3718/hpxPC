hpxAdminApp.controller('accountInfoController', function ($scope, $rootScope, $state, Upload, FILE_URL, $timeout, customerService, orderService, billService) {
    $scope.filter = {
        count:0,
    }
    //获取进行中的出票订单数量
    orderService.getOrderRunning('drawer').then(function (data) {
        if (data == undefined) {
            $scope.drawerCount = 0;
        } else {
            $scope.drawerCount = data;
        }
    });
    //获取进行中的订票订单数量
    orderService.getOrderRunning('receiver').then(function (data) {
        if (data == undefined) {
            $scope.receiverCount = 0;
        } else {
            $scope.receiverCount = data;
        }
    });
    //var count = 0;
    billService.getOwnBidding().then(function (data) {
        //return data;
        for (var i = 0, n = data.length; i < n; i++) {
            if (data[i].bid_result == 1) {
                $scope.filter.count++;
            }
        }
    });



});

hpxAdminApp.controller('addressController', function ($scope, $rootScope, $state, ngTableParams, addressService, customerService) {
    var emptyEntity = {};
    var newEntity = angular.copy(emptyEntity, newEntity);

    $scope.filter = {};
    //鑾峰彇鎵�鏈夌渷绾у湴鍧�鍚嶇О
    addressService.queryAll().then(function (data) {
        $scope.PData = data;
        $scope.filterProvince();
    });
    //鏍规嵁鐪佺骇鍦板潃id锛岃幏鍙栨湰鐪佸競鍖哄湴鍧�鍚嶇О
    $scope.filterProvince = function () {
        if ($scope.model.province_id == null) {
            return;
        }
        else {
            return addressService.queryCity($scope.model.province_id).then(function (data) {
                $scope.CData = data;
            });
        }
        $scope.filterCity();
    },
    //鏍规嵁甯傜骇鍦板潃id锛岃幏鍙栨湰甯傚尯鐨勫湴鍧�鍚嶇О
    $scope.filterCity = function () {
        if ($scope.model.city_id == null) {
            return;
        }
        else {
            return addressService.queryDstrict($scope.model.city_id).then(function (data) {
                $scope.DstrictData = data;
            });
        }
    },
    //鑾峰彇瀹㈡埛瀵瑰簲鐨勬墍鏈夊鎴峰湴鍧�
   $scope.tableParams = new ngTableParams({ 'sorting': { 'customer_id': 'asc' } }, {
       getData: function (params) {
           return customerService.getAllCustomerAddress(params).then(function (data) {
               $scope.first = $scope.getFirst(params);
               $scope.AddressData = data;
               for (var i = 0; i < $scope.AddressData.length; i++) {
                   if ($scope.AddressData[i].is_default == 1) {
                       $scope.AddressData[i].is_default = "鏄�";
                   } else {
                       $scope.AddressData[i].is_default = null;
                   }
               }
           });
       }
   });
    //鍒锋柊琛ㄦ牸
    $scope.reflash = function () {
        $scope.tableParams.reload();
    }
    //璁剧疆榛樿鍦板潃
    $scope.default = function (item) {
        customerService.updateAddressDefault(item).then(function (data) {
            $scope.tableParams.reload();
        });
    }
    //鑻ata==null锛屼负鏂板锛屽脊绐楀唴瀹逛负绌猴紱鍚﹀垯锛屼负缂栬緫锛屽脊绐椾负瀵瑰簲id鐨勫唴瀹�
    $scope.edit = function (data) {
        if (data == null) {
            $scope.model = newEntity;
        }
        else {
            $scope.model = angular.copy(data);
            $scope.filterProvince();
            $scope.filterCity();
        }
        $('#modal-edit').modal('show');
    };
    //鑻d涓虹┖锛屽垯鏂板瀹㈡埛鍦板潃锛涘惁鍒欎负鏇存柊瀹㈡埛鍦板潃
    $scope.save = function () {
        if ($scope.model.id == null) {
            //鏂板瀹㈡埛鍦板潃
            customerService.addAddress($scope.model).then(function (data) {
                $scope.tableParams.reload();
                angular.copy(emptyEntity, newEntity);
                $scope.editForm.$setPristine();
                $('#modal-edit').modal('hide');
            });
        }
        else {
            //鏇存柊瀹㈡埛鍦板潃
            customerService.updateAddress($scope.model).then(function (data) {
                $scope.tableParams.reload();
                $scope.editForm.$setPristine();
                $('#modal-edit').modal('hide');
            });
        }
    };
    //鍒犻櫎瀹㈡埛鍦板潃淇℃伅锛岄粯璁ゅ湴鍧�涓嶈兘鍒犻櫎
    $scope.delete = function (data) {
        if (data.is_default == 1) {
            alert("涓嶈兘鍒犻櫎榛樿鍦板潃淇℃伅锛�");
        } else {
            if (confirm('纭畾瑕佸垹闄ゆ湰鏉″湴鍧�淇℃伅鍚楋紵')) {
                customerService.removeAddress(data.id).then(function (data) {
                    $scope.tableParams.reload();
                });
            }
        }
    };

});
hpxAdminApp.controller('appController', function ($rootScope, $scope, $state) {
    $scope.getFirst = function (params) {
        if (params.total() <= (params.page() - 1) * params.count()) {
            return Math.floor(params.total() / params.count()) * params.count() + 1;
        }
        else {
            return (params.page() - 1) * params.count() + 1;
        }
    };

    $scope.tbd = function () {
        alert('姝ゅ姛鑳芥鍦ㄥ紑鍙戜腑锛屾暚璇锋湡寰�...');
    };

    //澶у啓鐨勯噾棰�
    $scope.amountInWords = function(n) {
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
            return "";
        var unit = "鍗冪櫨鎷句嚎鍗冪櫨鎷句竾鍗冪櫨鎷惧厓瑙掑垎", str = "";
        n += "00";
        var p = n.indexOf('.');
        if (p >= 0)
            n = n.substring(0, p) + n.substr(p + 1, 2);
        unit = unit.substr(unit.length - n.length);
        for (var i = 0; i < n.length; i++)
            str += '闆跺９璐板弫鑲嗕紞闄嗘煉鎹岀帠'.charAt(n.charAt(i)) + unit.charAt(i);
        return str.replace(/闆�(鍗億鐧緗鎷緗瑙�)/g, "闆�").replace(/(闆�)+/g, "闆�").replace(/闆�(涓噟浜縷鍏�)/g, "$1").replace(/(浜�)涓噟澹�(鎷�)/g, "$1$2").replace(/^鍏冮浂?|闆跺垎/g, "").replace(/鍏�$/g, "鍏冩暣");
    }
});

hpxAdminApp.controller('calendarController', function ($rootScope, $scope, $state, uiCalendarConfig, constantsService, toolService) {
    $scope.filter = {
        billTypeId: 101,
        number: 6,
    };

    constantsService.queryConstantsType(1).then(function (data) {
        $scope.billTypeData = data;
    });

    $scope.uiConfig = {
        calendar: {
            editable: true,
            dayNames: ["鍛ㄦ棩", "鍛ㄤ竴", "鍛ㄤ簩", "鍛ㄤ笁", "鍛ㄥ洓", "鍛ㄤ簲", "鍛ㄥ叚"],
            dayNamesShort: ["鏃�", "涓�", "浜�", "涓�", "鍥�", "浜�", "鍏�"],
            header: {
                left: 'title',
                center: '',
                right: 'today prev,next'
            }
        }
    };

    toolService.searchCalendar(new Date().getFullYear(), new Date().getMonth() + 1, $scope.filter.billTypeId, $scope.filter.number).then(function (data) {
        //$scope.events = [];
        for (var i = 0; i < data.length; i++) {
            $scope.events.splice($scope.events, 1);
        }
        for (var i = 0; i < data.length; i++) {
            $scope.events.push({
                id: data[i].id,
                title: data[i].bill_calendar_days + '澶�' + ' ' + data[i].day_status,
                start: new Date(data[i].day),
                allDay: true
            })
        }
        //$scope.eventSources = [$scope.events];
    });


    $scope.show = function () {
        if ($scope.filter.billTypeId == 102) {
            $scope.filter.number = 6;
        }
        toolService.searchCalendar(new Date().getFullYear(), new Date().getMonth() + 1, $scope.filter.billTypeId, $scope.filter.number).then(function (data) {
            //$scope.events = [];
            for (var i = 0; i < data.length; i++) {
                $scope.events.splice($scope.events,1);
            }
            for (var i = 0; i < data.length; i++) {
                $scope.events.push({
                    id: data[i].id,
                    title: data[i].bill_calendar_days + '澶�' + ' ' + data[i].day_status,
                    start: new Date(data[i].day),
                    allDay: true
                })
            }
            //$scope.eventSources = [$scope.events];
        });
    }
    


    $scope.events = [];
    $scope.eventSources = [$scope.events];

});

hpxAdminApp.controller('customerAddressController', function ($scope, $rootScope, $state, ngTableParams, customerService) {
    var emptyEntity = {};
    var newEntity = angular.copy(emptyEntity, newEntity);

    $scope.filter = { };
    //鑾峰彇瀹㈡埛瀵瑰簲鐨勬墍鏈夊鎴峰湴鍧�
    $scope.tableParams = new ngTableParams({ 'sorting': { 'customer_id': 'asc' } }, {
        getData: function (params) {
            return customerService.getAllCustomerAddress(params).then(function (data) {
                $scope.first = $scope.getFirst(params);
                return data;
            });
        }
    });
    //鍒锋柊琛ㄦ牸
    $scope.reflash = function () {
        $scope.tableParams.reload();
    }
    //鑻ata==null锛屼负鏂板锛屽脊绐楀唴瀹逛负绌猴紱鍚﹀垯锛屼负缂栬緫锛屽脊绐椾负瀵瑰簲id鐨勫唴瀹�
    $scope.edit = function (data) {
        if (data == null) {
            $scope.model = newEntity;
        }
        else {
            $scope.model = angular.copy(data);
        }
        $('#modal-edit').modal('show');
    };
    //鑻d涓虹┖锛屽垯鏂板瀹㈡埛鍦板潃锛涘惁鍒欎负鏇存柊瀹㈡埛鍦板潃
    $scope.save = function () {
        if ($scope.model.id == null) {
            customerService.addAddress($scope.model).then(function (data) {
                $scope.tableParams.reload();
                angular.copy(emptyEntity, newEntity);
                $scope.editForm.$setPristine();
                $('#modal-edit').modal('hide');
            });
        }
        else {
            customerService.updateAddress($scope.model).then(function (data) {
                $scope.tableParams.reload();
                $scope.editForm.$setPristine();
                $('#modal-edit').modal('hide');
            });
        }
    };
    //鍒犻櫎瀹㈡埛鍦板潃淇℃伅
    $scope.remove = function (data) {
        if (confirm('纭畾瑕佸垹闄ゆ湰鏉″湴鍧�淇℃伅鍚楋紵')) {
            customerService.removeAddress(data.id).then(function (data) {
                $scope.tableParams.reload();
            });
        }
    };
});
hpxAdminApp.controller('customerController', function ($scope, $rootScope, $state, Upload, FILE_URL, $timeout, ngTableParams, customerService, fileService, addressService, constantsService, bankService) {

    $scope.filter = {
    };
    //榛樿瀹㈡埛绫诲瀷涓轰紒涓氬鎴�
    $scope.model = {
        customer_type_code: 301
    };
    //鑾峰彇鑷繁鐨勬敞鍐岃祫鏂欙紱璋冪敤provinceChange鑾峰彇甯傦紝璋冪敤cityChange鑾峰彇鍖猴紱璁剧疆榛樿鏄剧ず鐨勮瘉浠跺浘鐗�
    customerService.getCustomer().then(function (data) {
        $scope.model = data;
        $scope.provinceChange();
        $scope.cityChange();
        if (!$scope.model.credential_front_photo_path) {
            $scope.model.credential_front_photo_path = 'assets/img/hpx-14.jpg';
        }
        if (!$scope.model.credential_back_photo_path) {
            $scope.model.credential_back_photo_path = 'assets/img/hpx-15.jpg';
        }
    });
    //鑾峰彇瀹㈡埛绫诲瀷
    constantsService.queryConstantsType(3).then(function (data) {
        $scope.customerTypeData = data;
    })
    //鑾峰彇浜ゆ槗绫诲瀷
    constantsService.queryConstantsType(11).then(function (data) {
        $scope.tradeLevelCode = data;
    })
    //鑾峰彇鎵�鏈夌殑鐪佺骇鍦板潃
    addressService.queryAll().then(function (data) {
        $scope.ProvinceData = data;
    });
    //鑾峰彇瀵瑰簲鐪佺殑甯�
    $scope.provinceChange = function () {
        if ($scope.model.enterprise_province_id == null) {
            return;
        }
        else {
            return addressService.queryCity($scope.model.enterprise_province_id).then(function (data) {
                $scope.CityData = data;
            });
        }
    }
    //鑾峰彇瀵瑰簲甯傜殑鍖�
    $scope.cityChange = function () {
        if ($scope.model.enterprise_city_id == null) {
            return;
        }
        else {
            return addressService.queryDstrict($scope.model.enterprise_city_id).then(function (data) {
                $scope.AddressData = data;
            });
        }
    }
    //鎻愮ず淇℃伅鎸夐挳
    $scope.Reminder = function () {
        $('#modal-license').modal('show');
    }
    //鍒锋柊椤甸潰淇℃伅
    $scope.reflash = function () {
        customerService.getCustomer().then(function (data) {
            $scope.model = data;
        });
    }
    //鎻愪氦瀹㈡埛淇℃伅杩涜瀹℃牳
    $scope.save = function () {
        if (!$scope.model.enterprise_name) {
            alert('璇疯緭鍏ヤ紒涓氬悕绉帮紒');
            return;
        }

        if (!$scope.model.customer_name) {
            alert('璇疯緭鍏ヨ仈绯讳汉锛�');
            return;
        }

        if (!$scope.model.credential_front_photo_id) {
            alert('璇蜂笂浼犺惀涓氭墽鐓э紒');
            return;
        }

        if (confirm("鏇存柊瀹㈡埛璧勬枡鍚庨渶缁忚繃绠＄悊鍛樺鏍告墠鑳藉紑閫氫氦鏄擄紝鏄惁纭鎻愪氦锛�")) {
            $scope.model.credential_description = '钀ヤ笟鎵х収';
            customerService.updateCustomer($scope.model).then(function (data) {
                alert('鎻愪氦鎴愬姛锛岃绛夊緟绠＄悊鍛樺鏍革紒');
                window.location.reload();
            });
        }
    };
    //瀹℃牳閫氳繃鐨勪俊鎭紝鐐瑰嚮淇敼锛屾洿鏀逛负鏈鏍哥姸鎬侊紝閲嶆柊杩涜瀹㈡埛淇℃伅鐨勭紪杈�
    $scope.submit = function () {
        if (confirm("宸插鏍稿鎴蜂慨鏀逛俊鎭皢瀵艰嚧閲嶆柊瀹℃牳锛佹槸鍚︾‘璁や慨鏀癸紵")) {
            $scope.model.credential_description = '钀ヤ笟鎵х収';
            customerService.updateCustomer($scope.model).then(function (data) {
                window.location.reload();
            });
        }
    };

    //鑾峰彇鏂囦欢鐨剈rl
    $scope.getFileURL = function (id) {
        if (id != null) {
            return FILE_URL + '/file' + id;
        }
    }
    //涓婁紶鏂囦欢
    $scope.uploadFiles = function (files, errFiles, successFunc) {
        $scope.uploading = true;
        if (errFiles.length > 0) {
            alert('鏈夋枃浠朵笉绗﹀悎瑕佹眰锛屾棤娉曚笂浼狅紒');
        }
        angular.forEach(files, function (file) {
            file.upload = Upload.upload({
                url: FILE_URL + '/file',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + $rootScope.identity.token },
                file: file,
                data: { 'FileTypeCode': 1002 }
            }).then(successFunc, function (response) {
                if (response.status > 0) {
                    alert('涓婁紶澶辫触!' + response.status + ': ' + response.data);
                }
            }, function (evt) {

            });
        });
    };
    //璁剧疆璇佷欢鐓х墖涓轰笂浼犵殑鏂囦欢
    $scope.setFrontID = function (response) {
        $timeout(function () {
            $scope.model.credential_front_photo_id = response.data.data.id;
            $scope.model.credential_front_photo_path = response.data.data.file_path;
        })
    };
    $scope.setBackID = function (response) {
        $timeout(function () {
            $scope.model.credential_back_photo_id = response.data.data.id;
            $scope.model.credential_back_photo_path = response.data.data.file_path;
        })
    };
});
hpxAdminApp.controller('editQuoteController', function ($rootScope, $scope, $timeout, $state, $stateParams, addressService, customerService, ngTableParams, billService, constantsService) {
    //鍒ゆ柇鏄惁鍙繘琛屾姤浠凤紝涓嶈灏辩洿鎺ヨ繑鍥�
    if ($rootScope.identity.can_publish_offer != 1) {
        alert("鎮ㄦ殏鏃惰繕涓嶈兘鎶ヤ环锛�");
        window.history.back();
        return;
    }
    //璁剧疆榛樿鐨勫唴瀹�
    var emptyEntity = {
        'contact_name': $rootScope.identity.customer_name,
        'contact_phone': $rootScope.identity.phone_number,
        'offer_detail': {},
        'bill_style_id': 201,
        'deadline_type_code': 1701,
        'trade_type_id': 1801,
        'trade_background_code': 1601,
        'max_price_type': 0,
    };
    //濡傛灉id涓嶄负0锛岃幏鍙栨寚瀹氭姤浠蜂俊鎭�
    if ($stateParams.id) {
        billService.getBillOffer($stateParams.id).then(function (data) {
            $scope.model = data;
            if ($scope.model.max_price > 0) {
                $scope.model.max_price_type = 1;
            }

            try {
                $scope.model.offer_detail = JSON.parse($scope.model.offer_detail);
            }
            catch (e) {
            }
        });
    }
    else {
        $scope.model = emptyEntity;
    }
    //鑾峰彇鎵�鏈夌渷绾у湴鍧�
    addressService.queryAll().then(function (data) {
        $scope.ProvinceData = data;
    });
    //鑾峰彇鎵�鏈夊競绾у湴鍧�
    $scope.provinceChange = function () {
        if ($scope.model.trade_province_id == null) {
            return;
        }
        else {
            return addressService.queryCity($scope.model.trade_province_id).then(function (data) {
                $scope.CityData = data;
            });
        }
    };
    //鑾峰彇绁ㄦ嵁绫诲瀷
    constantsService.queryConstantsType(1).then(function (data) {
        $scope.billTypeData = data;
    })
    //鑾峰彇绁ㄦ嵁灞炴�х被鍨�
    constantsService.queryConstantsType(2).then(function (data) {
        $scope.billStyleData = data;
    })
    //绁ㄦ嵁灞炴�у彂鐢熷彉鍖栨椂锛岃幏鍙栦笉鍚岀殑鎵垮厬鏈烘瀯
    $scope.billStyleChange = function () {
        constantsService.queryAcceptorTypeforOffer($scope.model.bill_style_id).then(function (data) {
            $scope.acceptorTypeData = data;
            for (var i = 0; i < $scope.acceptorTypeData.length; i++) {
                if ($scope.acceptorTypeData[i].code == 2001) {
                    $scope.acceptorTypeData[i].checked = true;
                }
            }
            $scope.acceptorTypeChange();
        })
    }
    //鑾峰彇璐告槗鑳屾櫙
    constantsService.queryConstantsType(16).then(function (data) {
        $scope.tradeBackgroundData = data;
    })
    //鑾峰彇鏈熼檺绫诲瀷
    constantsService.queryConstantsType(17).then(function (data) {
        $scope.deadlineTypeData = data;
    })
    //鑾峰彇浜ゆ槗鏂瑰紡绫诲瀷
    constantsService.queryConstantsType(7).then(function (data) {
        $scope.tradeTypeCode = data;
    })
    //鑾峰彇浜ゆ槗绫诲瀷
    constantsService.queryConstantsType(18).then(function (data) {
        $scope.tradeType = data;
    })
    //鑾峰彇鍕鹃�夌殑鎵垮厬鏈烘瀯
    $scope.acceptorTypeChange = function () {
        $scope.offer_acceptorType = [];
        for (var i = 0; i < $scope.acceptorTypeData.length; i++) {
            if ($scope.acceptorTypeData[i].checked) {
                $scope.offer_acceptorType.push($scope.acceptorTypeData[i]);
            }
        }
        $scope.offer_acceptorType.push($scope.plus);
    }

    $scope.save = function () {
        if ($scope.model.bill_style_id == 201 || $scope.model.bill_style_id == 203 || $scope.model.bill_style_id == 205) {
            if (!$scope.model.trade_location_id) {
                alert("璇烽�夋嫨浜ゆ槗鍦扮偣銆�");
                return;
            }
        }

        $scope.model.offer_detail = JSON.stringify($scope.model.offer_detail);

        if ($scope.model.id == null) {
            //鏂板鎶ヤ环
            billService.insertBillOffer($scope.model).then(function (data) {
                alert('鏂板鎶ヤ环鎴愬姛锛�');
                $state.go('app.main.quote');
            });
        }
        else {
            //淇敼鎶ヤ环
            billService.updateBillOffer($scope.model).then(function (data) {
                alert('淇敼鎶ヤ环鎴愬姛锛�');
                $state.go('app.main.quote');
            });
        }
    };
});
hpxAdminApp.controller('endorsementController', function ($rootScope, $scope, $timeout, $state, FILE_URL, Upload, billService, fileService) {
    //榛樿鏄剧ず鐨勫浘鐗�
    $scope.model = {
        'bill_front_photo_address': 'assets/img/hpx-14.jpg',
        'bill_back_photo_address': 'assets/img/hpx-15.jpg',
    };
    $scope.filter = {};
    //鑾峰彇鏂囦欢url
    $scope.getFileURL = function (id) {
        if (id != null) {
            return FILE_URL + '/file' + id;
        }
    }
    //涓婁紶鏂囦欢
    $scope.uploadFiles = function (files, errFiles, successFunc) {
        $scope.uploading = true;
        if (errFiles.length > 0) {
            alert('鏈夋枃浠朵笉绗﹀悎瑕佹眰锛屾棤娉曚笂浼狅紒');
        }
        angular.forEach(files, function (file) {
            file.upload = Upload.upload({
                url: FILE_URL + '/file',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + $rootScope.identity.token },
                file: file,
                data: { 'FileTypeCode': 1002 }
            }).then(successFunc, function (response) {
                if (response.status > 0) {
                    alert('涓婁紶澶辫触!' + response.status + ': ' + response.data);
                }
            }, function (evt) {

            });
        });
    };
    //璁剧疆鍥剧墖id锛寀rl
    $scope.setFrontID = function (response) {
        $timeout(function () {
            $scope.model.bill_front_photo_id = response.data.data.id;
            $scope.model.bill_front_photo_address = response.data.data.file_path;
        })
    };
    $scope.setBackID = function (response) {
        $timeout(function () {
            $scope.model.bill_back_photo_id = response.data.data.id;
            $scope.model.bill_back_photo_address = response.data.data.file_path;
        })
    };
    //淇濆瓨涓婁紶鐨勫浘鐗囷紝骞舵彁绀轰笂浼犳垚鍔�
    $scope.save = function () {
        alert("鍥剧墖涓婁紶鎴愬姛锛�");
        location.reload(false);
    };

});

hpxAdminApp.controller('enterpriseAccountController', function ($scope, $rootScope, $state, ngTableParams, customerService, bankService, addressService, constantsService) {
    var emptyEntity = {  };
    var newEntity = angular.copy(emptyEntity, newEntity);

    $scope.filter = {};
    //鑾峰彇璐︽埛绫诲瀷
    constantsService.queryConstantsType(5).then(function (data) {
        $scope.accountTypeData = data;
    })
    //鑾峰彇鎵�鏈夌殑閾惰璐︽埛淇℃伅锛屽苟鏄剧ず鏄惁涓洪粯璁ら摱琛岃处鎴�
    $scope.tableParams = new ngTableParams({ 'sorting': { 'enterprise_address_id': 'asc' } }, {
        getData: function (params) {
            return customerService.getEnterpriseAccount(params).then(function (data) {
                $scope.first = $scope.getFirst(params);
                $scope.AccountData = data;
                for (var i = 0; i < $scope.AccountData.length; i++) {
                    if ($scope.AccountData[i].is_default == 1) {
                        $scope.AccountData[i].is_default = "鏄�";
                    } else {
                        $scope.AccountData[i].is_default = null;
                    }
                }
            });
        }
    });
    //鍒锋柊
    $scope.reflash = function () {
        $scope.tableParams.reload();
    }
    //璁剧疆涓洪粯璁よ处鎴�
    $scope.default = function (item) {
        customerService.updateEnterpriseDefault(item).then(function (data) {
            $scope.tableParams.reload();
        });
    }
    //璇诲彇瀵瑰簲閾惰璐︽埛鐨勮缁嗕俊鎭�
    $scope.read = function (data) {
        $scope.model = angular.copy(data);
        $('#modal-read').modal('show');
    };
    //鑾峰彇瀵瑰簲閾惰璐︽埛鐨勪俊鎭紝鐢ㄤ簬淇敼閾惰璐︽埛淇℃伅
    $scope.edit = function (data) {
        $scope.model = angular.copy(data);
        if ($scope.model.bank_name) {
            $scope.model.keyword = $scope.model.bank_name;
            $scope.BankChange();
        }
        $scope.model.keyword = null;
        $('#modal-add').modal('show');
    };
    //鏂板閾惰璐︽埛
    $scope.add = function (data) {
        if (data == null) {
            $scope.model = newEntity;
            $scope.model = {
                'account_person': $rootScope.identity.enterprise_name,
            };
            $('#modal-add').modal('show');  // 鏄剧ず澧炲姞閾惰璐﹀彿鐨勫脊鍑虹獥鍙�
        }
    };

    $scope.submit = function () {
        if (!$scope.model.account_person) {
            alert("娌℃湁娉ㄥ唽浼佷笟璐︽埛锛岃鍏堟敞鍐屼紒涓氳处鎴峰啀娉ㄥ唽閾惰璐︽埛锛�");
        } else {
            if ($scope.model.id == null) {
                //鏂板閾惰璐︽埛淇℃伅
                customerService.insertEnterpriseAccount($scope.model).then(function (data) {
                    $scope.tableParams.reload();
                    angular.copy(emptyEntity, newEntity);
                    $scope.addForm.$setPristine();
                    $('#modal-add').modal('hide');
                });
            }
            else {
                //鏇存柊閾惰璐︽埛淇℃伅
                if (!$scope.model.is_default) {
                    $scope.model.is_default = 1;
                } else {
                    $scope.model.is_default = null;
                }
                customerService.updateWnterpriseAccount($scope.model).then(function (data) {
                    $scope.tableParams.reload();
                    angular.copy(emptyEntity, newEntity);
                    $scope.addForm.$setPristine();
                    $('#modal-add').modal('hide');
                });
            }
        }
    };
    //鑾峰彇鎵�鏈夌殑閾惰璐︽埛鎬昏淇℃伅
    bankService.queryAll().then(function (data) {
        $scope.bankData = data;
    });
    //鑾峰彇鎵�鏈夌殑鐪佺骇鍦板潃
    addressService.queryAll().then(function (data) {
        $scope.ProAddressData = data;
        $scope.ProvinceChange();
    });
    //鑾峰彇瀵瑰簲鐪佺殑甯傜骇鍦板潃
    $scope.ProvinceChange = function () {
        if ($scope.model.bankprovince) {
            return addressService.getCity($scope.model.bankprovince).then(function (data) {
                $scope.BankCityData = data;
                addressService.queryAll().then(function (Pdata) {       //鑾峰彇鎵�鏈夌殑鍦板潃淇℃伅锛屾壘鍒板搴旂殑id锛屾妸瀵瑰簲鐨刟ddressname鍙戠粰閾惰鎵�鍦ㄧ渷
                    for (var i = 0; i < Pdata.length; i++) {
                        if ($scope.model.bankprovince == Pdata[i].id) {
                            $scope.model.bank_province = Pdata[i].address_name;
                        };
                    }
                });
            });
        }
    },
    //鏍规嵁鎬昏锛屾墍鍦ㄥ競锛屽叧閿瓧鎵惧埌瀵瑰簲鐨勫垎琛屾暟鎹�
    $scope.BankChange = function () {
        if ($scope.filter.HeadBankID || $scope.model.bankcity || $scope.model.keyword) {
            return bankService.getBank($scope.filter.HeadBankID, $scope.model.bankcity, $scope.model.keyword).then(function (data) {
                $scope.branchData = data;
                if ($scope.model.bankprovince) {
                    addressService.getCity($scope.model.bankprovince).then(function (Cdata) {       //鑾峰彇瀵瑰簲鐪佺殑鍦板潃淇℃伅锛屾壘鍒板搴旂殑id锛屾妸瀵瑰簲鐨刟ddressname鍙戠粰閾惰鎵�鍦ㄥ競
                        for (var i = 0; i < Cdata.length; i++) {
                            if ($scope.model.bankcity == Cdata[i].id) {
                                $scope.model.bank_city = Cdata[i].address_name;
                            };
                        }
                    });
                }
            });
        }
    },
    //鍒犻櫎閾惰璐︽埛
    $scope.remove = function (data) {
        if (confirm('纭畾瑕佸垹闄ゆ湰閾惰璐︽埛鍚楋紵')) {
            customerService.deleteEnterpriseAccount(data.id).then(function (data) {
                $scope.tableParams.reload();
            });
        }
    };
    //寮瑰嚭楠岃瘉绐楀彛
    $scope.verify = function (data) {
        $scope.model = data;
        $('#modal-verify').modal('show');
    };
    //璋冪敤鍚庡彴鍔熻兘杩涜鑷姩楠岃瘉
    $scope.verifySubmit = function () {
        customerService.verify($scope.model.id, $scope.model.verify_string).then(function () {
            alert('楠岃瘉鎴愬姛锛�');
            $scope.tableParams.reload();
            $('#modal-verify').modal('hide');
        });
    };
});
hpxAdminApp.controller('enterpriseController', function ($scope, $rootScope, $timeout, $state, Upload, FILE_URL, ngTableParams, customerService, fileService, addressService, constantsService, bankService) {
    var emptyEntity = { };
    var newEntity = angular.copy(emptyEntity, newEntity);

    $scope.model2 = {
        'credential_photos': 'assets/img/hpx-14.jpg',
        //'credential_photos': 'assets/img/hpx-15.jpg',
    };
    $scope.filter = {};

    addressService.queryAll().then(function (data) {
        $scope.ProvinceData = data;
        $scope.filterProvinceChange();
    });
    $scope.filterProvinceChange = function () {
        if ($scope.filter.ProvinceID == null) {
            return;
        }
        else {
            return addressService.queryCity($scope.filter.ProvinceID).then(function (data) {
                $scope.CityData = data;
            });
        }
    }

    bankService.queryAll().then(function (data) {
        $scope.bankData = data;
        $scope.BankChange();
    });
    addressService.queryAll().then(function (data) {
        $scope.ProAddressData = data;
        $scope.ProvinceChange();
    });
    $scope.ProvinceChange = function () {
        if ($scope.model.bankprovince == null) {
            return;
        }
        else {
            return addressService.queryCity($scope.model.bankprovince).then(function (data) {
                $scope.BankCityData = data;
                $scope.BankChange();
                addressService.queryAll().then(function (Pdata) {
                    for (var i = 0; i < Pdata.length; i++) {
                        if ($scope.model.bankprovince == Pdata[i].id) {
                            $scope.model.bank_province = Pdata[i].address_name;
                        };
                    }
                });
            });
        }
    },
    $scope.BankChange = function () {
        return bankService.getBank($scope.filter.HeadBankID, $scope.model.bankcity).then(function (data) {
            $scope.branchData = data;
            addressService.queryCity($scope.model.bankprovince).then(function (Cdata) {
                for (var i = 0; i < Cdata.length; i++) {
                    if ($scope.model.bankcity == Cdata[i].id) {
                        $scope.model.bank_city = Cdata[i].address_name;
                    };
                }
            });
        });
    },

    addressService.queryAll().then(function (data) {
        $scope.PData = data;
        $scope.filterProvince();
    });
    $scope.filterProvince = function () {
        if ($scope.model.province_id == null) {
            return;
        }
        else {
            return addressService.queryCity($scope.model.province_id).then(function (data) {
                $scope.CData = data;
            });
        }
        $scope.filterCity();
    },
    $scope.filterCity = function () {
        if ($scope.model.city_id == null) {
            return;
        }
        else {
            return addressService.queryDstrict($scope.model.city_id).then(function (data) {
                $scope.DstrictData = data;
            });
        }
    },

    constantsService.queryConstantsType(5).then(function (data) {
        $scope.accountTypeData = data;
    })
    constantsService.queryConstantsType(11).then(function (data) {
        $scope.tradeLevelCode = data;
    })
    //$scope.tableParams = new ngTableParams({ sorting: { 'enterprise_address_id': 'asc' } }, {
    //    getData: function (params) {
    //        return customerService.getAllEnterprise(params).then(function (data) {
    //            $scope.first = $scope.getFirst(params);
    //            return data;
    //        });
    //    }
    //});

    customerService.getAllEnterprise().then(function (data) {
        $scope.model2 = data;
    });
    $scope.save = function () {
        if (!$scope.model2.enterprise_name) {
            alert("璇疯緭鍏ヤ紒涓氬悕绉帮紒");
            return;
        }
        if (!$scope.model2.telephone) {
            alert("璇疯緭鍏ュ浐瀹氱數璇濓紒");
            return;
        }
        //if (!$scope.model.fax_number) {
        //    alert("璇疯緭鍏ヤ紶鐪熷彿鐮侊紒");
        //    return;
        //}
        if (!$scope.model2.enterprise_address_id) {
            alert("璇烽�夋嫨浼佷笟鐪佸競鍦板潃锛�");
            return;
        }
        if (!$scope.model2.enterprise_address) {
            alert("璇疯緭鍏ヤ紒涓氳缁嗗湴鍧�锛�");
            return;
        }
        if (!$scope.model2.credential_number) {
            alert("璇疯緭鍏ヨ瘉浠跺彿鐮侊紒");
            return;
        } 
        if (!$scope.model2.credential_description) {
            alert("璇烽�夋嫨璇佷欢绫诲瀷锛�");
            return;
        } 
        if (!$scope.model2.trade_level_code) {
            alert("璇烽�夋嫨浜ゆ槗绫诲瀷锛�");
            return;
        }
        if (!$scope.model2.credential_photos) {
            alert("璇蜂笂浼犺瘉浠剁収鐗囷紒");
            return;
        }
        //if ($scope.model.id == null) {
        customerService.insertEnterprise($scope.model2).then(function (data) {
            angular.copy(emptyEntity, newEntity);
            customerService.getAllEnterprise().then(function (data) {
                $scope.model2 = data;
            });
        });
        //}
        //else {
        //    customerService.updateEnterprise($scope.model).then(function (data) {
        //    });
        //}
        if (confirm("淇濆瓨鎴愬姛锛佹槸鍚︾敵璇风鐞嗗憳瀹℃牳锛燂紵锛�")) {
            customerService.sendCustomerReview().then(function (data) { });
        };
    };

    $scope.tableParams = new ngTableParams({ 'sorting': { 'enterprise_address_id': 'asc' } }, {
        getData: function (params) {
            return customerService.getEenterpriseAccount(params).then(function (data) {
                $scope.first = $scope.getFirst(params);
                $scope.AccountData= data;
            });
        }
    });
    $scope.AddresstableParams = new ngTableParams({ 'sorting': { 'customer_id': 'asc' } }, {
        getData: function (params) {
            return customerService.getAllCustomerAddress(params).then(function (data) {
                $scope.first = $scope.getFirst(params);
                $scope.AddressData= data;
            });
        }
    });
    //customerService.insertEenterpriseAccount($scope.model).then(function (data) {
    //    $scope.tableParams.reload();
    //    angular.copy(emptyEntity, newEntity);
    //    $scope.editForm.$setPristine();
    //});

    $scope.read = function (data) {
        $scope.model = angular.copy(data);
        $('#modal-read').modal('show');
    };

    $scope.add = function (data) {
        if (data == null) {
            $scope.model = angular.copy(data);
            $('#modal-add').modal('show');  // 鏄剧ず澧炲姞閾惰璐﹀彿鐨勫脊鍑虹獥鍙�
        }
    };
    $scope.submit = function () {
        if ($scope.model.id == null) {
            customerService.insertEenterpriseAccount($scope.model).then(function (data) {
                $scope.tableParams.reload();
                angular.copy(emptyEntity, newEntity);
                $scope.addForm.$setPristine();
                $('#modal-add').modal('hide');
            });
        }
    };

    $scope.remove = function (data) {
        if (confirm('纭畾瑕佸垹闄ゆ湰閾惰璐︽埛鍚楋紵')) {
            customerService.deleteEenterpriseAccount(data.id).then(function (data) {
                $scope.tableParams.reload();
            });
        }
    };

    $scope.edit = function (data) {
        if (data == null) {
            $scope.model = newEntity;
        }
        else {
            $scope.model = angular.copy(data);
        }
        $('#modal-edit').modal('show');
    };
    $scope.sure = function () {
        if ($scope.model.id == null) {
            customerService.addAddress($scope.model).then(function (data) {
                $scope.AddresstableParams.reload();
                angular.copy(emptyEntity, newEntity);
                $scope.editForm.$setPristine();
                $('#modal-edit').modal('hide');
            });
        }
        else {
            customerService.updateAddress($scope.model).then(function (data) {
                $scope.AddresstableParams.reload();
                $scope.editForm.$setPristine();
                $('#modal-edit').modal('hide');
            });
        }
    };

    $scope.delete = function (data) {
        if (confirm('纭畾瑕佸垹闄ゆ湰鏉″湴鍧�淇℃伅鍚楋紵')) {
            customerService.removeAddress(data.id).then(function (data) {
                $scope.AddresstableParams.reload();
            });
        }
    };


});
hpxAdminApp.controller('footerController', function ($rootScope, $scope, $state) {
     
});

hpxAdminApp.controller('forgetPasswordController', function ($rootScope, $scope, $state, $interval, billService, customerService, constantsService) {
    $scope.model = {};
    $scope.verifyStr = "鑾峰彇楠岃瘉鐮�";
    $scope.disableVerify = false;
    $scope.update = function () {
        //閲嶇疆瀵嗙爜
        customerService.customerPasswordReset($scope.model.phone_number, $scope.model).then(function () {
            alert('閲嶇疆瀵嗙爜鎴愬姛锛�')
        })
    }

    var second = 90;
    //鍙戦�侀獙璇佺爜
    $scope.getVerify = function () {
        if (!$scope.model.phone_number || $scope.model.phone_number.length != 11) {
            alert('璇疯緭鍏ユ纭殑鎵嬫満鍙风爜锛�');
            return;
        }

        customerService.phoneVerify($scope.model.phone_number).then(function () {
            alert('楠岃瘉鐮佸凡鍙戦��');
            $scope.second = 90;
            $scope.disableVerify = true;

            $interval(function () {
                $scope.verifyStr = $scope.second + "绉掑悗鍙噸鏂拌幏鍙�";
                $scope.second--;

                if ($scope.second == 0) {
                    $scope.verifyStr = "閲嶆柊鑾峰彇楠岃瘉鐮�";
                    $scope.disableVerify = false;
                }
            }, 1000, 90);
        })
    };
    //璺宠浆鍒扮綉绔欓椤�
    $scope.tosignon = function () {
        $state.go("home");
    }
});

hpxAdminApp.controller('freeController', function ($rootScope, $scope, $state, customerService) {
});

hpxAdminApp.controller('headerController', function ($rootScope, $scope, $state, Restangular, customerService, localStorageService) {
    //閫�鍑虹櫥褰曞姛鑳斤紝閫�鍑哄悗璺宠浆鍒扮綉绔欓椤�
    $scope.logout = function () {
        if (confirm('纭瑕侀��鍑虹櫥褰曞悧锛�')) {
            customerService.customerLogout().then(function () {
                localStorageService.set('customer', null);
                $rootScope.identity = null;
                Restangular.setDefaultHeaders({});
                $state.go('home');
            });
        }
    };

});

hpxAdminApp.controller('homeController', function ($rootScope, $scope, $state, ngTableParams, addressService, constantsService, bankService, localStorageService, Restangular, customerService, portalService, orderService, billService, toolService) {
    //登录事件
    $scope.login = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode != 13 && keycode != 0 && keycode != 1 && keycode != undefined) {
            return;
        }
        //登录功能，登录成功后跳转到个人中心
        customerService.customerLogin($scope.loginRequest).then(function (data) {
            localStorageService.set('customer', data);

            // TODO
            $rootScope.identity = data;
            Restangular.setDefaultHeaders({ 'Authorization': 'Bearer ' + data.token });
            $state.go('app.main.accountInfo');
        });
    };
    //获取新闻信息
    portalService.lastInformation(2).then(function (data) {
        $scope.news = data;
    });
    //获取承兑机构类型
    constantsService.queryConstantsType(4).then(function (data) {
        $scope.acceptorTypeData = data;
    })
    //新手引导
    portalService.lastInformation(3).then(function (data) {
        $scope.guides = data;
    });
    //跳转到注册界面
    $scope.tosignup = function () {
        $state.go("app.signup");
    }
    //获取交易额
    orderService.orderCount().then(function (data) {
        $scope.orderCount = data;
    });
    //获取首页电票数据信息
    billService.billProductElectronic().then(function (data) {
        $scope.billProductElectronic = data.bill_products;
    });
    //获取首页纸票数据信息
    billService.billProductPaper().then(function (data) {
        $scope.billProductPaper = data.bill_products;
    });
    //获取首页报价数据信息
    billService.billOfferPaper().then(function (data) {
        $scope.billOfferPaper = data.bill_offers;

        for (var i = 0; i < $scope.billOfferPaper.length; i++) {
            try {
                $scope.billOfferPaper[i].offer_detail = JSON.parse($scope.billOfferPaper[i].offer_detail);
            }
            catch (e) {
            }
        }
    });
    //toolService.interestRate().then(function (data) {
    //    $scope.interestRate = data;
    //});

    //toolService.priceTrend().then(function (data) {
    //    $scope.priceTrend = data;
    //}); 


    $scope.showCalculator = function () {
        $('#modal-calculator').modal('show');
    }

    $scope.submitCalculator = function () {
        toolService.calculator($scope.calculatorModel).then(function (data) {
            $scope.calculatorResult = data;
        })
    }

    $scope.showEnterprise = function () {
        $('#modal-enterprise').modal('show');
    }

    $scope.submitEnterprise = function () {
        customerService.enterpriseDetail($scope.enterpriseModel.keyword).then(function (data) {
            $scope.enterpriseResult = data[0];
        })
    }

    $scope.showBank = function () {
        $('#modal-bank').modal('show');
    }

    //获取所有的银行账户信息，并显示是否为默认银行账户
    $scope.tableParams = new ngTableParams({ }, {
        getData: function (params) {
            if ($scope.filter.headBankId || $scope.filter.bankAddressId || $scope.filter.keyword) {
                return bankService.getBank($scope.filter.headBankId, $scope.filter.bankAddressId, $scope.filter.keyword).then(function (data) {
                    return data;
                });
            }
        }
    });
    //刷新
    $scope.submitBank = function () {
        $scope.tableParams.reload();
    }

    //获取所有的银行账户总行信息
    bankService.queryAll().then(function (data) {
        $scope.bankData = data;
    });

    //获取所有的省级地址
    addressService.queryAll().then(function (data) {
        $scope.ProAddressData = data;
        $scope.ProvinceChange();
    });

    //获取对应省的市级地址
    $scope.ProvinceChange = function () {
        if ($scope.filter.bankprovince) {
            return addressService.getCity($scope.filter.bankprovince).then(function (data) {
                $scope.BankCityData = data;
                addressService.queryAll().then(function (Pdata) {       //获取所有的地址信息，找到对应的id，把对应的addressname发给银行所在省
                    for (var i = 0; i < Pdata.length; i++) {
                        if ($scope.model.bankprovince == Pdata[i].id) {
                            $scope.model.bank_province = Pdata[i].address_name;
                        };
                    }
                });
            });
        }
    }

    $scope.showCalendar = function () {
        $('#modal-calendar').modal('show');
    }
});

hpxAdminApp.controller('imgController', function ($rootScope, $scope, $state, $stateParams) {
    $scope.path = decodeURI($stateParams.path);
});

hpxAdminApp.controller('informationController', function ($rootScope, $scope, $state, $stateParams, $sce, portalService) {
    //获取指定id的发布信息
    portalService.getInformation($stateParams.id).then(function (data) {
        $scope.model = data;
        $scope.detail = $sce.trustAsHtml(data.detail);
    });
});

hpxAdminApp.controller('informationListController', function ($rootScope, $scope, $state, $stateParams, ngTableParams, portalService) {
    //获取发布信息类型
    portalService.getInformationType($stateParams.type).then(function (data) {
        $scope.typeName = data.information_type_name;
    });
    //获取所有发布信息
    portalService.queryInformation($stateParams.type).then(function (data) {
        $scope.informations = data;
    });
});

hpxAdminApp.controller('loadingController', function ($rootScope, $scope, $state) {
    $(document).scroll(function () {
        $(".loading-modal").css("height", document.body.scrollHeight);
        $(".loader").css("top", document.body.clientHeight * 0.35 + document.body.scrollTop);
    });
});

hpxAdminApp.controller('mainController', function ($rootScope, $scope, $state, $timeout, customerService, localStorageService) {
    customerService.testLogin().then(function (data) {
        $rootScope.identity.can_publish = data.can_publish;
        $rootScope.identity.can_receive = data.can_receive;
        $rootScope.identity.can_bid_paper_bill = data.can_bid_paper_bill;
        $rootScope.identity.can_bid_electronic_bill = data.can_bid_electronic_bill;
        $rootScope.identity.can_sell_paper_bill = data.can_sell_paper_bill;
        $rootScope.identity.can_sell_electronic_bill = data.can_sell_electronic_bill;
        $rootScope.identity.can_see_bill_detail = data.can_see_bill_detail;
        $rootScope.identity.can_publish_offer = data.can_publish_offer;
        $rootScope.identity.can_see_offer_detail = data.can_see_offer_detail;
        $rootScope.identity.is_verified = data.is_verified;

        localStorageService.set('customer', $rootScope.identity);
    })
});

hpxAdminApp.controller('menuController', function ($rootScope, $scope, $state, customerService) {
 
});

hpxAdminApp.controller('modifyPasswordController', function ($rootScope, $scope, $state, billService, customerService, constantsService) {
    $scope.model = {};
    $scope.update = function () {
        //淇敼瀵嗙爜
        customerService.customerModifyPassword($scope.model).then(function () {
            alert('淇敼瀵嗙爜鎴愬姛锛�')
        })
    }
    //鑾峰彇楠岃瘉鐮�
    $scope.getVerify = function () {
        customerService.phoneVerify($scope.model.phone_number).then(function () {
            alert('楠岃瘉鐮佸凡鍙戦��');
        });
    };
    //璺宠浆鍒扮綉绔欓椤�
    $scope.tosignon = function () {
        $state.go("home");
    }
});

hpxAdminApp.controller('myBiddingController', function ($rootScope, $scope, $state, ngTableParams, billService) {
    $scope.filter = {};
    //鑾峰彇鎴戠殑鍑轰环淇℃伅
    $scope.tableParams = new ngTableParams({ 'sorting': { 'publishing_time': 'desc' } }, {
        getData: function (params) {
            return billService.getOwnBillBidding(params).then(function (data) {
                $scope.first = $scope.getFirst(params);
                return data;
            });
        }
    });

    //$scope.reflash = function () {
    //    $scope.tableParams.reload();
    //}

    //$scope.show = function (data) {
    //    $scope.model = angular.copy(data);
    //};

    //$scope.showBidding = function (item) {
    //    billService.getBillProductBidding(item.id).then(function (data) {
    //        $scope.biddings = data;
    //        $scope.model = item;
    //    });

    //    $('#modal-bidding').modal('show');
    //};

    //$scope.finishBidding = function (item) {
    //    if (confirm('纭閫夋嫨璇ユ敹绁ㄤ汉杩涜浜ゆ槗鍚楋紵')) {
    //        billService.newOrderBidding({ 'bill_product_id': $scope.model.id, 'bill_product_bidding_id': item.id }).then(function (data) {
    //            alert('纭浜ゆ槗鏂规垚鍔燂紒');

    //            $scope.tableParams.reload();
    //            $('#modal-bidding').modal('hide');
    //        });
    //    }
    //};
});

hpxAdminApp.controller('myBillController', function ($rootScope, $scope, $state, FILE_URL, ngTableParams, $timeout, Upload, billService, addressService, customerService, constantsService, bankService, fileService) {
    $scope.filter = {};
   
    //$scope.tableParams = new ngTableParams({ 'sorting': { 'publishing_time': 'desc' } }, {
    //    getData: function (params) {
    //        return billService.getOwnBillProduct(params, 1).then(function (data) {
    //            $scope.first = $scope.getFirst(params);
    //            return data;
    //        });
    //    }
    //});
    //鑾峰彇鎴戠殑绁ㄦ嵁鐨勫嚭浠蜂俊鎭�
    $scope.tableParams = new ngTableParams({ 'sorting': { 'publishing_time': 'desc' } }, {
        getData: function (params) {
            return billService.getOwnBillProduct(params).then(function (data) {
                $scope.first = $scope.getFirst(params);
                return data;
            });
        }
    });
    //鍒锋柊
    $scope.reflash = function () {
        $scope.tableParams.reload();
    }

    //$scope.show = function (data) {
    //    $scope.model = angular.copy(data);
    //};
    //鑾峰彇瀵瑰簲鐨勭エ鎹殑鍑轰环淇℃伅锛屽脊鍑虹獥鍙�
    $scope.showBidding = function (item) {
        billService.getBillProductBidding(item.id).then(function (data) {
            $scope.biddings = data;
            $scope.model = item;
        });
        $('#modal-bidding').modal('show');
    };
    //閫夋嫨浜ゆ槗鏂癸紝闅愯棌寮圭獥
    $scope.finishBidding = function (item) {
        if (confirm('纭閫夋嫨璇ユ敹绁ㄤ汉杩涜浜ゆ槗鍚楋紵')) {
            billService.newOrderBidding({ 'bill_product_id': $scope.model.id, 'bill_product_bidding_id': item.id }).then(function (data) {
                alert('纭浜ゆ槗鏂规垚鍔燂紒');

                $scope.tableParams.reload();
                $('#modal-bidding').modal('hide');
            });
        }
    };
    //鍒犻櫎鏌愭潯鍙戝竷
    $scope.remove = function (data) {
        if (confirm('纭畾瑕佸垹闄よ鍙戝竷鍚楋紵')) {
            billService.deleteBill(data.id).then(function (data) {
                $scope.tableParams.reload();
            });
        }
    }
    //鑾峰彇鎵�鏈夌殑甯搁噺绫诲瀷
    constantsService.queryAll().then(function (data) {
        $scope.contantData = data;
    })
    //鑾峰彇鎵垮厬鏈烘瀯绫诲瀷
    constantsService.queryConstantsType(4).then(function (data) {
        $scope.acceptorTypeData = data;
    })
    //鑾峰彇绁ㄦ嵁绫诲瀷淇℃伅
    constantsService.queryConstantsType(1).then(function (data) {
        $scope.billTypeData = data;
    })
    //鑾峰彇绁ㄦ嵁灞炴�х被鍨�
    constantsService.queryConstantsType(2).then(function (data) {
        $scope.billStyleData = data;
    })
    //鑾峰彇鐢电エ鐟曠柕绫诲瀷
    constantsService.queryConstantsType(19).then(function (data) {
        $scope.billFlawData = data;
    })
    //鑾峰彇绾哥エ鐟曠柕绫诲瀷
    constantsService.queryConstantsType(15).then(function (data) {
        $scope.billFlawData2 = data;
    })
    //鑾峰彇浜ゆ槗鏂瑰紡绫诲瀷
    constantsService.queryConstantsType(7).then(function (data) {
        $scope.tradeTypeCode = data;
    })
    //鑾峰彇鎵�鏈夌殑鐪佺骇鍦板潃
    addressService.queryAll().then(function (data) {
        $scope.provinceData = data;
    });
    //鑾峰彇瀵瑰簲鐪佺殑甯傜骇鍦板潃
    $scope.provinceChange = function () {
        if (!$scope.model.product_province_id) {
            $scope.cityData = [];
        }
        else {
            return addressService.queryCity($scope.model.product_province_id).then(function (data) {
                $scope.cityData = data;
            });
        }
    }
    //榛樿姹囩エ鍒版湡鏃�
    $scope.billTypeChange = function () {
        if ($scope.model.bill_type_id == 101) {
            $scope.model.bill_deadline_time = new Date().setYear(new Date().getFullYear() + 1);
        }
        else {
            $scope.model.bill_deadline_time = new Date().setMonth(new Date().getMonth() + 6);
        }
    }
    //鏂囦欢涓婁紶
    $scope.uploadFiles = function (files, errFiles, successFunc) {
        $scope.uploading = true;
        if (errFiles.length > 0) {
            alert('鏈夋枃浠朵笉绗﹀悎瑕佹眰锛屾棤娉曚笂浼狅紒');
        }
        angular.forEach(files, function (file) {
            file.upload = Upload.upload({
                url: FILE_URL + '/file',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + $rootScope.identity.token },
                file: file,
                data: { 'FileTypeCode': 1002 }
            }).then(successFunc, function (response) {
                if (response.status > 0) {
                    alert('涓婁紶澶辫触!' + response.status + ': ' + response.data);
                }
            }, function (evt) {

            });
        });
    };
    //璁剧疆浼犻�掔粰鍚庡彴鐨勫浘鐗囨暟鎹负涓婁紶鐨勫浘鐗囦俊鎭�
    $scope.setFrontID = function (response) {
        $timeout(function () {
            $scope.model.bill_front_photo_id = response.data.data.id;
            $scope.model.bill_front_photo_path = response.data.data.file_path;
        })
    };
    $scope.setBackID = function (response) {
        $timeout(function () {
            $scope.model.bill_back_photo_id = response.data.data.id;
            $scope.model.bill_back_photo_path = response.data.data.file_path;
        })
    };

    //$scope.tableParams = new ngTableParams({ 'sorting': { 'publishing_time': 'desc' } }, {
    //    getData: function (params) {
    //        return billService.getOwnBillProduct(params, 0).then(function (data) {
    //            $scope.first = $scope.getFirst(params);
    //            return data;
    //        });
    //    }
    //});
    //缂栬緫淇℃伅锛涜幏鍙栧搴旂渷鐨勫競鍖烘暟鎹紱璁剧疆榛樿鏄剧ず鐨勫浘鐗囦俊鎭紱寮瑰嚭绐楀彛
    $scope.edit = function (data) {
        $scope.model = angular.copy(data);
        $scope.provinceChange();

        if (!$scope.model.bill_front_photo_path) {
            $scope.model.bill_front_photo_path = 'assets/img/hpx-14.jpg';
        }
        if (!$scope.model.bill_back_photo_path) {
            $scope.model.bill_back_photo_path = 'assets/img/hpx-15.jpg';
        }

        $('#modal-edit').modal('show');
    };

    $scope.save = function () {
        if (!$scope.model.bill_type_id) {
            alert("璇烽�夋嫨绁ㄦ嵁绫诲瀷");
            return;
        }

        if (!$scope.model.trade_type_code) {
            alert("璇烽�夋嫨浜ゆ槗鏂瑰紡");
            return;
        }

        if (!$scope.model.bill_sum_price) {
            alert("璇疯緭鍏ョエ闈㈤噾棰�");
            return;
        }

        if ($scope.model.trade_type_code == 701) {
            if (!$scope.model.bill_front_photo_id) {
                alert("璇蜂笂浼犳眹绁ㄦ闈�");
                return;
            }
        }
        else {
            if (!$scope.model.acceptor_type_id) {
                alert("璇烽�夋嫨鎵垮厬鏈烘瀯");
                return;
            }

            if (!$scope.model.acceptor_name) {
                alert("璇疯緭鍏ユ壙鍏戜汉鍚嶇О");
                return;
            }

            if (!$scope.model.bill_deadline_time) {
                alert("璇疯緭鍏ユ眹绁ㄥ埌鏈熸棩");
                return;
            }

            if (!$scope.model.contact_name) {
                alert("璇疯緭鍏ヨ仈绯讳汉");
                return;
            }

            if (!$scope.model.contact_phone) {
                alert("璇疯緭鍏ヨ仈绯绘柟寮�");
                return;
            }
        }
        
        $scope.model.bill_flaw_ids = [];
        if ($scope.model.bill_type_id == 101) {     //鑾峰彇鎵�鏈夊嬀閫夌殑鐢电エ鐨勭憰鐤�
            for (var i = 0; i < $scope.billFlawData.length; i++) {
                if ($scope.billFlawData[i].checked) {
                    $scope.model.bill_flaw_ids.push($scope.billFlawData[i].code);
                }
            }
        }
        else {
            for (var i = 0; i < $scope.billFlawData2.length; i++) {     //鑾峰彇鎵�鏈夊嬀閫夌殑绾哥エ鐨勭憰鐤�
                if ($scope.billFlawData2[i].checked) {
                    $scope.model.bill_flaw_ids.push($scope.billFlawData2[i].code);
                }
            }
        }
        //淇敼瀵瑰簲鐨勬垜鐨勫彂甯冿紝鍒锋柊鍒楄〃锛岄殣钘忓脊绐�
        billService.updateBillProduct($scope.model.id, $scope.model).then(function (data) {
            $scope.tableParams.reload();
            $scope.editForm.$setPristine();
            $('#modal-edit').modal('hide');
        });
    }
});

hpxAdminApp.controller('myBillFailController', function ($rootScope, $scope, $state, FILE_URL, ngTableParams, $timeout, Upload, billService, addressService, customerService, constantsService, bankService, fileService) {
    constantsService.queryAll().then(function (data) {
        $scope.contantData = data;
    })
    constantsService.queryConstantsType(4).then(function (data) {
        $scope.acceptorTypeData = data;
    })
    constantsService.queryConstantsType(1).then(function (data) {
        $scope.billTypeData = data;
    })
    constantsService.queryConstantsType(2).then(function (data) {
        $scope.billStyleData = data;
    })
    constantsService.queryConstantsType(19).then(function (data) {
        $scope.billFlawData = data;
    })
    constantsService.queryConstantsType(15).then(function (data) {
        $scope.billFlawData2 = data;
    })
    constantsService.queryConstantsType(7).then(function (data) {
        $scope.tradeTypeCode = data;
    })
    addressService.queryAll().then(function (data) {
        $scope.provinceData = data;
    });
    $scope.provinceChange = function () {
        if (!$scope.model.product_province_id) {
            $scope.cityData = [];
        }
        else {
            return addressService.queryCity($scope.model.product_province_id).then(function (data) {
                $scope.cityData = data;
            });
        }
    }
    $scope.billTypeChange = function () {
        if ($scope.model.bill_type_id == 101) {
            $scope.model.bill_deadline_time = new Date().setYear(new Date().getFullYear() + 1);
        }
        else {
            $scope.model.bill_deadline_time = new Date().setMonth(new Date().getMonth() + 6);
        }
    }
    $scope.uploadFiles = function (files, errFiles, successFunc) {
        $scope.uploading = true;
        if (errFiles.length > 0) {
            alert('鏈夋枃浠朵笉绗﹀悎瑕佹眰锛屾棤娉曚笂浼狅紒');
        }
        angular.forEach(files, function (file) {
            file.upload = Upload.upload({
                url: FILE_URL + '/file',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + $rootScope.identity.token },
                file: file,
                data: { 'FileTypeCode': 1002 }
            }).then(successFunc, function (response) {
                if (response.status > 0) {
                    alert('涓婁紶澶辫触!' + response.status + ': ' + response.data);
                }
            }, function (evt) {

            });
        });
    };
    $scope.setFrontID = function (response) {
        $timeout(function () {
            $scope.model.bill_front_photo_id = response.data.data.id;
            $scope.model.bill_front_photo_path = response.data.data.file_path;
        })
    };
    $scope.setBackID = function (response) {
        $timeout(function () {
            $scope.model.bill_back_photo_id = response.data.data.id;
            $scope.model.bill_back_photo_path = response.data.data.file_path;
        })
    };

    $scope.tableParams = new ngTableParams({ 'sorting': { 'publishing_time': 'desc' } }, {
        getData: function (params) {
            return billService.getOwnBillProduct(params, 0).then(function (data) {
                $scope.first = $scope.getFirst(params);
                return data;
            });
        }
    });

    $scope.edit = function (data) {
        $scope.model = angular.copy(data);
        $scope.provinceChange();

        if(!$scope.model.bill_front_photo_path) {
            $scope.model.bill_front_photo_path = 'assets/img/hpx-14.jpg';
        }
        if (!$scope.model.bill_back_photo_path) {
            $scope.model.bill_back_photo_path = 'assets/img/hpx-15.jpg';
        }

        $('#modal-edit').modal('show');
    };

    $scope.save = function () {
        if (!$scope.model.bill_type_id) {
            alert("璇烽�夋嫨绁ㄦ嵁绫诲瀷");
            return;
        }

        if (!$scope.model.trade_type_code) {
            alert("璇烽�夋嫨浜ゆ槗鏂瑰紡");
            return;
        }

        if (!$scope.model.bill_sum_price) {
            alert("璇疯緭鍏ョエ闈㈤噾棰�");
            return;
        }

        if ($scope.model.trade_type_code == 701) {
            if (!$scope.model.bill_front_photo_id) {
                alert("璇蜂笂浼犳眹绁ㄦ闈�");
                return;
            }
        }
        else {
            if (!$scope.model.acceptor_type_id) {
                alert("璇烽�夋嫨鎵垮厬鏈烘瀯");
                return;
            }

            if (!$scope.model.acceptor_name) {
                alert("璇疯緭鍏ユ壙鍏戜汉鍚嶇О");
                return;
            }

            if (!$scope.model.bill_deadline_time) {
                alert("璇疯緭鍏ユ眹绁ㄥ埌鏈熸棩");
                return;
            }

            if (!$scope.model.contact_name) {
                alert("璇疯緭鍏ヨ仈绯讳汉");
                return;
            }

            if (!$scope.model.contact_phone) {
                alert("璇疯緭鍏ヨ仈绯绘柟寮�");
                return;
            }
        }

        $scope.model.bill_flaw_ids = [];
        if ($scope.model.bill_type_id == 101) {
            for (var i = 0; i < $scope.billFlawData.length; i++) {
                if ($scope.billFlawData[i].checked) {
                    $scope.model.bill_flaw_ids.push($scope.billFlawData[i].code);
                }
            }
        }
        else {
            for (var i = 0; i < $scope.billFlawData2.length; i++) {
                if ($scope.billFlawData2[i].checked) {
                    $scope.model.bill_flaw_ids.push($scope.billFlawData2[i].code);
                }
            }
        }

        billService.updateBillProduct($scope.model.id, $scope.model).then(function (data) {
            $scope.tableParams.reload();
            $scope.editForm.$setPristine();
            $('#modal-edit').modal('hide');
        });
    }
});

hpxAdminApp.controller('orderDrawerController', function ($rootScope, $scope, $timeout, $state, FILE_URL, Upload, ngTableParams, orderService, customerService) {
    var emptyEntity = {};
    var newEntity = angular.copy(emptyEntity, newEntity);

    $scope.filter = {};
    //鑾峰彇鎴戠殑鍑虹エ璁㈠崟
    $scope.tableParams = new ngTableParams({ 'sorting': { 'id': 'desc' } }, {
        getData: function (params) {
            return orderService.getOwnOrderDrawer(params).then(function (data) {
                // $scope.first = $scope.getFirst(params);
                return data;
            });
            
        }
    });
    //鍒锋柊
    $scope.reflash = function () {
        $scope.tableParams.reload();
    }
    //鑾峰彇鍑虹エ璁㈠崟瀵瑰簲id鐨勮缁嗕俊鎭�
    $scope.read = function (item) {
        orderService.getOrder(item.id).then(function (data) {
            $scope.model = data;
        });
    };
});

hpxAdminApp.controller('orderDrawerInfoController', function ($rootScope, $scope, $state, $timeout, $stateParams, FILE_URL, Upload, ngTableParams, orderService, customerService, payingService) {
    //鑾峰彇鍑虹エ璁㈠崟璇︽儏
    init = function () {
        orderService.getOrder($stateParams.id).then(function (data) {
            $scope.model = data;
            $timeout(function () {
                $('.jqzoom').imagezoom();
            });
        });
    }
    init();
    //鏀粯鎵嬬画璐�
    $scope.payCommission = function () {
        if (confirm('纭畾瑕佹敮浠樻墜缁垂鍚楋紵')) {
            orderService.orderPayCommission($scope.model.id).then(function () {
                payingService.GetPlatformAccount().then(function (data) {
                    $scope.PlatformData = data;
                })
                if ($scope.PlatformData.platform_account_balance > $scope.model.receiver_commission) {
                    alert('鎵嬬画璐规敮浠樻垚鍔燂紒');
                } else {
                    alert('璐︽埛浣欓涓嶈冻锛佽鍏呭�硷紒');
                }

                init();
                $('#modal-edit').modal('hide');
            });
        }
    };

    customerService.getAllEnterpriseAccount(501).then(function (data) {
        $scope.accounts = data;
    })
    //寮瑰嚭鑳屼功绐楀彛
    $scope.showEndorsement = function () {
        $scope.endorsements = [];
        $('#modal-endorsement').modal('show');
    };
    //鏂囦欢涓婁紶
    $scope.uploadFiles = function (files, errFiles, successFunc) {
        $scope.uploading = true;
        if (errFiles.length > 0) {
            alert('鏈夋枃浠朵笉绗﹀悎瑕佹眰锛屾棤娉曚笂浼狅紒');
        }
        angular.forEach(files, function (file) {
            file.upload = Upload.upload({
                url: FILE_URL + '/file',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + $rootScope.identity.token },
                file: file,
                data: { 'FileTypeCode': 1002 }
            }).then(successFunc, function (response) {
                if (response.status > 0) {
                    alert('涓婁紶澶辫触!' + response.status + ': ' + response.data);
                }
            }, function (evt) {

            });
        });
    };
    //澧炲姞鑳屼功
    $scope.add = function (response) {
        $timeout(function () {
            $scope.endorsements.push({
                'endorsement_id': response.data.data.id,
                'endorsement_address': response.data.data.file_path,
                'endorsement_file_name': response.data.data.file_name
            });
        })
    }
    //鍒犻櫎鑳屼功鍥剧墖
    $scope.remove = function (index) {
        if (confirm('纭畾瑕佸垹闄よ鏂囦欢鍚楋紵')) {
            $scope.endorsements.splice(index, 1);
        }
    };
    //涓婁紶鍑虹エ鏂硅儗涔�
    $scope.endorsement = function () {
        if (!$scope.model.drawer_account_id) {
            alert("璇烽�夋嫨鏀舵璐﹀彿");
            return;
        }

        if (confirm('鏄惁纭涓婁紶鍑虹エ鏂硅儗涔︼紵')) {
            var model = {
                endorsement_id_list: [],
                endorsement_messages: [],
                drawer_account_id: $scope.model.drawer_account_id
            };
            for (var i = 0; i < $scope.endorsements.length; i++) {
                model.endorsement_id_list.push($scope.endorsements[i].endorsement_id);
                model.endorsement_messages.push($scope.endorsements[i].endorsement_message);
            }

            orderService.orderEndorsement($scope.model.id, model).then(function () {
                alert('鍑虹エ鏂硅儗涔︽垚鍔燂紒');

                init();
                $('#modal-endorsement').modal('hide');
                $('#modal-edit').modal('hide');
            });
        }
    };
    //鍒犻櫎宸蹭笂浼犵殑鍑虹エ鏂硅儗涔�
    $scope.deleteEndorsement = function () {
        if (confirm('鏄惁瑕佸垹闄ゅ凡涓婁紶鐨勫嚭绁ㄦ柟鑳屼功锛�')) {
            orderService.deleteOrderEndorsement($scope.model.id).then(function () {
                alert('鑳屼功鍒犻櫎鎴愬姛锛岃閲嶆柊涓婁紶锛�');

                init();
                $('#modal-edit').modal('hide');
            });
        }
    };
    //寮瑰嚭鏇存柊鐗╂祦淇℃伅绐楀彛
    $scope.showLogistic = function () {
        $scope.logisticModel = {};
        $('#modal-logistic').modal('show');
    };
    //鏇存柊鐗╂祦淇℃伅
    $scope.addLogistic = function () {
        orderService.orderLogistics($scope.model.id, $scope.logisticModel).then(function () {
            alert('鏇存柊鐗╂祦淇℃伅鎴愬姛锛�');

            init();
            $('#modal-logistic').modal('hide');
        });
    };
});

hpxAdminApp.controller('orderReceiverController', function ($rootScope, $scope, $state, API_URL, ngTableParams, orderService, customerService) {
    var emptyEntity = {};
    var newEntity = angular.copy(emptyEntity, newEntity);

    $scope.filter = {};
    //鑾峰彇鎴戠殑鏀剁エ璁㈠崟
    $scope.tableParams = new ngTableParams({ 'sorting': { 'id': 'desc' } }, {
        getData: function (params) {
            return orderService.getOwnOrderReceiver(params).then(function (data) {
                // $scope.first = $scope.getFirst(params);
                return data;
            });
        }
    });
    //鍒锋柊
    $scope.reflash = function () {
        $scope.tableParams.reload();
    }
    //鑾峰彇鏀剁エ璁㈠崟瀵瑰簲id鐨勭エ鎹鎯�
    $scope.read = function (item) {
        orderService.getOrder(item.id).then(function (data) {
            $scope.model = data;
        });
    };
});

hpxAdminApp.controller('orderReceiverInfoController', function ($rootScope, $scope, $timeout, $state, $stateParams, API_URL, ngTableParams, orderService, customerService, payingService, constantsService) {

    //鑾峰彇鏀剁エ璁㈠崟璇︽儏
    init = function () {
        orderService.getOrder($stateParams.id).then(function (data) {
            $scope.model = data;
            $timeout(function () {
                $('.jqzoom').imagezoom();
            });
        });
    }
    init();
    //鍥剧墖鏀惧ぇ闀滃姛鑳�
    if ($stateParams.id) {
        $('.jqzoom').imagezoom();
    }
    //鑾峰彇鑳屼功璐﹀彿
    customerService.getAllEnterpriseAccount(502).then(function (data) {
        $scope.accounts = data;
        $scope.addressModel = {};
        $scope.addressModel.receiver_account_id = data[0].id;
    })
    //鑾峰彇鏀粯鏂瑰紡绫诲瀷淇℃伅
    constantsService.queryConstantsType(12).then(function (data) {
        $scope.orderPayTypeData = data;
    })

    //鑾峰彇浼佷笟瀵瑰簲鐨勬敹璐у湴鍧�淇℃伅
    customerService.getAllCustomerAddress().then(function (data) {
        $scope.addresses = data;
    })
    //鏀粯鎵嬬画璐�
    $scope.payCommission = function () {
        if (confirm('纭畾瑕佹敮浠樻墜缁垂鍚楋紵')) {
            orderService.orderPayCommission($scope.model.id).then(function () {
                payingService.GetPlatformAccount().then(function (data) {
                    $scope.PlatformData = data;
                })
                if ($scope.PlatformData.platform_account_balance > $scope.model.receiver_commission) {
                    alert('鎵嬬画璐规敮浠樻垚鍔燂紒');
                } else {
                    alert('璐︽埛浣欓涓嶈冻锛佽鍏呭�硷紒');
                }

                init();
                $('#modal-edit').modal('hide');
            });
        }
    };
    //寮瑰嚭浠樻绐楀彛
    $scope.showPay = function () {
        $('#modal-address').modal('show');
    };
    //鏀粯绁ㄦ嵁娆�
    $scope.pay = function () {
        if (confirm('纭畾瑕佹敮浠樼エ鎹鍚楋紵')) {
            orderService.updateOrderReceiver($scope.model.id, $scope.addressModel).then(function () {
                window.open(API_URL + '/orders/orderPay/' + $scope.model.id.toString() + '?orderPayTypeId=' + $scope.addressModel.order_pay_type_id.toString());
                $('#modal-address').modal('hide');
            });
        }
    };
    //绛炬敹鑳屼功
    $scope.confirm = function () {
        if (confirm('纭绛炬敹鑳屼功骞跺畬鎴愪氦鏄撳悧锛�')) {
            orderService.orderConfirm($scope.model.id).then(function () {
                alert('鑳屼功绛炬敹瀹屾垚锛�');

                init();
                $('#modal-edit').modal('hide');
            });
        }
    };
});

hpxAdminApp.controller('orderWaitController', function ($rootScope, $scope, $stateParams, $state, ngTableParams, billService, constantsService, orderService) {
    $scope.filter = {
        'bill_front_photo_path': 'assets/img/hpx-14.jpg',
        'bill_back_photo_path': 'assets/img/hpx-15.jpg',
    };
    //鑾峰彇鏀粯鏂瑰紡绫诲瀷
    constantsService.queryConstantsType(12).then(function (data) {
        $scope.payTypes = data;
    })

   //鑾峰彇璐︽埛鎵�鏈夌殑寰呯‘璁よ鍗�
    $scope.tableParams = new ngTableParams({ 'sorting': { 'id': 'desc' } }, {
        getData: function (params) {
            return billService.getOrderWait(params).then(function (data) {
               // $scope.first = $scope.getFirst(params);
                return data;
            });
        }
    });
    //鍒锋柊
    $scope.reflash = function () {
        $scope.tableParams.reload();
    }
    //鑾峰彇瀵瑰簲id鐨勫緟纭浜ゆ槗鐨勭エ鎹鎯咃紝寮瑰嚭绐楀彛
    $scope.edit = function (item) {
        $scope.model = item;

        $('#modal-edit').modal('show');
        $('.jqzoom').imagezoom();
    };

    //$scope.showFront = function () {
    //    window.open('index.html#/img?path=' + $scope.model.bill_front_photo_path);
    //}
    //$scope.showBack = function () {
    //    window.open('index.html#/img?path=' + $scope.model.bill_back_photo_path);
    //}
    //閫夋嫨鏀粯鏂瑰紡锛岀‘璁や氦鏄�
    $scope.confirm = function () {
        if (!$scope.model.order_pay_type_id) {
            alert("璇烽�夋嫨鏀粯鏂瑰紡锛�")
        }
        else if (confirm('纭璇ヤ氦鏄撳悧锛�')) {
            billService.confirmOrderWait($scope.model.id, { 'is_confirm': 1, 'order_pay_type_id': $scope.model.order_pay_type_id }).then(function (data) {
                alert('纭浜ゆ槗鎴愬姛锛�');

                $scope.tableParams.reload();
                $('#modal-edit').modal('hide');
                $('#modal-appraisal').modal('show');
            });
        }
    };
    //鎻愪氦璇勪环
    $scope.submit = function () {
        if (confirm('纭鎻愪氦璇ヨ瘎浠峰悧锛�')) {
            orderService.orderAppraisal($scope.model.id, { 'appraisal_message': $scope.model.appraisal_message }).then(function (data) {
                alert('纭璇勪环鎴愬姛锛�');

                $scope.tableParams.reload();
                $('#modal-appraisal').modal('hide');
            });
        }
    };
    //鎷掔粷浜ゆ槗
    $scope.reject = function () {
        if (confirm('鎷掔粷璇ヤ氦鏄撳悧锛�')) {
            billService.confirmOrderWait($scope.model.id, { 'is_confirm': 0 }).then(function (data) {
                alert('鎷掔粷浜ゆ槗鎴愬姛锛�');

                $scope.tableParams.reload();
                $('#modal-edit').modal('hide');
            });
        }
    };
});

hpxAdminApp.controller('paymentController', function ($rootScope, $scope, $timeout, $state, API_URL, Upload, billService, fileService) {
    $scope.model = {
        'bill_front_photo_address': 'assets/img/hpx-14.jpg',
        'bill_back_photo_address': 'assets/img/hpx-15.jpg',
    };
    $scope.filter = {};
    //鏂囦欢鐨剈rl
    $scope.getFileURL = function (id) {
        if (id != null) {
            return FILE_URL + '/file' + id;
        }
    }
    //鏂囦欢涓婁紶
    $scope.uploadFiles = function (files, errFiles, successFunc) {
        $scope.uploading = true;
        if (errFiles.length > 0) {
            alert('鏈夋枃浠朵笉绗﹀悎瑕佹眰锛屾棤娉曚笂浼狅紒');
        }
        angular.forEach(files, function (file) {
            file.upload = Upload.upload({
                url: FILE_URL + '/file',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + $rootScope.identity.token },
                file: file,
                data: { 'FileTypeCode': 1002 }
            }).then(successFunc, function (response) {
                if (response.status > 0) {
                    alert('涓婁紶澶辫触!' + response.status + ': ' + response.data);
                }
            }, function (evt) {

            });
        });
    };
    //璁剧疆浼犻�掔粰鍚庣鐨勫浘鐗囦负褰撳墠涓婁紶鐨勫浘鐗�
    $scope.setFrontID = function (response) {
        $timeout(function () {
            $scope.model.bill_front_photo_id = response.data.data.id;
            $scope.model.bill_front_photo_address = response.data.data.file_path;
        })
    };
    $scope.setBackID = function (response) {
        $timeout(function () {
            $scope.model.bill_back_photo_id = response.data.data.id;
            $scope.model.bill_back_photo_address = response.data.data.file_path;
        })
    };
    //涓婁紶鍥剧墖
    $scope.save = function () {
        alert("鍥剧墖涓婁紶鎴愬姛锛�");
        location.reload(false);
    };

});

hpxAdminApp.controller('portalSuggestionController', function ($scope, $rootScope, $state, ngTableParams, portalSuggestionService) {
    var emptyEntity = {};
    var newEntity = angular.copy(emptyEntity, newEntity);

    $scope.filter = {
        suggestionTypeId: "1",  //鎶曡瘔
        handleStatusCode: "0"   //鏈煡鐪�
    };

    

    //鑾峰彇鎵�鏈夌殑鎶曡瘔涓庡缓璁�
    $scope.tableParams = new ngTableParams({'sorting': { 'id': 'asc' } }, {
        getData: function (params) {
            return portalSuggestionService.query(params, $scope.filter.suggestionTypeId, $scope.filter.handleStatusCode, $scope.filter.keyword).then(function (data) {
                if (data != null) {
                    $scope.first = $scope.getFirst(params);
                    return data;
                }
                //else $scope.tableParams.reload();
            });
        }
    });
    //鍒锋柊
    $scope.reflash = function () {
        $scope.tableParams.reload();
    }
    
    $scope.edit = function (data) {
        if (data == null) {     //寮瑰嚭鏂板绐楀彛
            $scope.model = newEntity;
        }
        else {      //寮瑰嚭淇敼绐楀彛
            $scope.model = angular.copy(data);
        }
        $('#modal-edit').modal('show');
    };
    //鑾峰彇瀵瑰簲id鐨勬姇璇夊缓璁唴瀹�
    $scope.read = function (data) {
       // var id = data.id;
        $scope.model = angular.copy(data);
        $('#modal-read').modal('show');
    };

    $scope.save = function () {
        if ($scope.model.id == null) {      //鏂板鎶曡瘔寤鸿
            portalSuggestionService.add($scope.model).then(function (data) {
                $scope.tableParams.reload();
                angular.copy(emptyEntity, newEntity);
                $scope.editForm.$setPristine();
                $('#modal-edit').modal('hide');
            });
        }
        else {      //淇敼鎶曡瘔寤鸿
            portalSuggestionService.update($scope.model).then(function (data) {
                $scope.tableParams.reload();
                $scope.editForm.$setPristine();
                $('#modal-edit').modal('hide');
            });
        }
    };
    //澶勭悊鎶曡瘔淇℃伅
    $scope.deal = function () {
        portalSuggestionService.update($scope.model, $scope.modell).then(function (data) {
            $scope.tableParams.reload();
            $scope.editForm.$setPristine();
            $('#modal-read').modal('hide');
        });
        
    };




});

hpxAdminApp.controller('publishController', function ($rootScope, $scope, $timeout, $stateParams, $state, FILE_URL, Upload, billService, addressService, customerService, constantsService, bankService, fileService) {
    $scope.model = {
        'bill_front_photo_path': 'assets/img/hpx-14.jpg',
        'bill_back_photo_path': 'assets/img/hpx-15.jpg',
        'endorsement_number': 0,
        'contact_name': $rootScope.identity.customer_name,
        'contact_phone': $rootScope.identity.phone_number,
    };
    //鑾峰彇鍏ㄩ儴姹囩エ绫诲瀷
    constantsService.queryAll().then(function (data) {
        $scope.contantData = data;
    })
    //鑾峰彇鎵垮厬鏈烘瀯绫诲瀷
    constantsService.queryConstantsType(4).then(function (data) {
        $scope.acceptorTypeData = data;
    })
    //鑾峰彇绁ㄦ嵁绫诲瀷绫诲瀷
    constantsService.queryConstantsType(1).then(function (data) {
        $scope.billTypeData = data;
    })
    //鑾峰彇绁ㄦ嵁灞炴�х被鍨�
    constantsService.queryConstantsType(2).then(function (data) {
        $scope.billStyleData = data;
    })
    //鑾峰彇瀹㈡埛淇℃伅涓殑鐪佸競鍦板潃淇℃伅
    if (!$stateParams.id) {
        customerService.getCustomer().then(function (data) {
            $scope.model.product_province_id = data.enterprise_province_id;
            addressService.getCity($scope.model.product_province_id).then(function (data) {
                $scope.cityData = data;
            });
            $scope.model.product_location_id = data.enterprise_city_id;
        });
    }
    
    //鑾峰彇鎴戠殑鍙戝竷璇︾粏淇℃伅
    if ($stateParams.id) {
        billService.getBillProduct($stateParams.id).then(function (data) {
            $scope.model = data;
            $timeout(function () {
                if (!$scope.model.bill_front_photo_path) {
                    $scope.model.bill_front_photo_path = 'assets/img/hpx-14.jpg';
                }
                if (!$scope.model.bill_back_photo_path) {
                    $scope.model.bill_back_photo_path = 'assets/img/hpx-15.jpg';
                }
            });
            //$('.jqzoom').imagezoom();
        });
    }
    
    //鑾峰彇鐢电エ鐟曠柕绫诲瀷
    constantsService.queryConstantsType(19).then(function (data) {
        $scope.billFlawData = data;
        for (var i = 0; i < $scope.billFlawData.length; i++) {
            if ($scope.billFlawData[i].code == 1500) {
                $scope.billFlawData[i].checked = true;
                break;
            }
        }
    })
    //鑾峰彇绾哥エ鐟曠柕绫诲瀷
    constantsService.queryConstantsType(15).then(function (data) {
        $scope.billFlawData2 = data;
        for (var i = 0; i < $scope.billFlawData2.length; i++) {
            if ($scope.billFlawData2[i].code == 1500) {
                $scope.billFlawData2[i].checked = true;
                break;
            }
        }
    })
    //鑾峰彇浜ゆ槗鏂瑰紡绫诲瀷
    constantsService.queryConstantsType(7).then(function (data) {
        $scope.tradeTypeCode = data;
    })
    //鑾峰彇鍏ㄩ儴鐪佺骇鍦板潃
    addressService.queryAll().then(function (data) {
        $scope.provinceData = data;
        $scope.provinceChange();
    });
    //鑾峰彇鍚勭渷甯備笅闈㈢殑甯傚尯
    $scope.provinceChange = function () {
        if (!$scope.model.product_province_id) {
            $scope.cityData = [];
        }
        else {
            return addressService.getCity($scope.model.product_province_id).then(function (data) {
                $scope.cityData = data;
            });
        }
    }
    //鍦ㄤ笉鍚屼氦鏄撶被鍨嬩笅锛屽惊鐜幏鍙栨眹绁ㄧ憰鐤电殑澶氶�夌粨鏋�
    $scope.tradeTypeChange = function () {
        if ($scope.model.trade_type_code == 701) {
            if ($scope.model.bill_type_id == 101) {
                for (var i = 0; i < $scope.billFlawData.length; i++) {
                    if ($scope.billFlawData[i].code == 1500) {
                        $scope.billFlawData[i].checked = true;
                    }
                }
            }
            else {
                for (var i = 0; i < $scope.billFlawData2.length; i++) {
                    if ($scope.billFlawData2[i].code == 1500) {
                        $scope.billFlawData2[i].checked = true;
                    }
                }
            }          
        }       
    }
    //鐢电エ锛屽綋閫変腑鏃犵憰鐤垫椂锛屽叾浠栭�夐」鍧囦负false锛涘弽涔嬶紝閫変腑鍏朵粬閫夐」鏃讹紝鏃犵憰鐤甸�夐」涓篺alse
    $scope.billFlawChange = function (item) {
        if (item.code == 1500) {
            item.checked = true;
            for (var i = 1; i < $scope.billFlawData.length; i++) {
                $scope.billFlawData[i].checked = false;
            }
        }
        else {
            for (var i = 0; i < $scope.billFlawData.length; i++) {
                if (i == 0) {
                    $scope.billFlawData[i].checked = true;
                }
                else {
                    if ($scope.billFlawData[i].checked) {
                        $scope.billFlawData[0].checked = false;
                    }
                }
            }
        }
    }
    //绾哥エ锛屽綋閫変腑鏃犵憰鐤垫椂锛屽叾浠栭�夐」鍧囦负false锛涘弽涔嬶紝閫変腑鍏朵粬閫夐」鏃讹紝鏃犵憰鐤甸�夐」涓篺alse
    $scope.billFlawChange2 = function (item) {
        if (item.code == 1500) {
            item.checked = true;
            for (var i = 1; i < $scope.billFlawData2.length; i++) {
                $scope.billFlawData2[i].checked = false;
            }
        }
        else {
            for (var i = 0; i < $scope.billFlawData2.length; i++) {
                if (i == 0) {
                    $scope.billFlawData2[i].checked = true;
                }
                else {
                    if ($scope.billFlawData2[i].checked) {
                        $scope.billFlawData2[0].checked = false;
                    }
                }
            }
        }
    }
    //鐐瑰嚮姹囩エ鍒版湡鏃ワ紝榛樿閫変腑鐨勬椂闂�
    $scope.billTypeChange = function () {
        if ($scope.model.bill_type_id == 101) {
            $scope.model.bill_deadline_time = new Date().setYear(new Date().getFullYear() + 1);
        }
        else {
            $scope.model.bill_deadline_time = new Date().setMonth(new Date().getMonth() + 6);
        }
    }
    //鍥剧墖涓婁紶鍔熻兘
    $scope.uploadFiles = function (files, errFiles, successFunc) {
        $scope.uploading = true;
        if (errFiles.length > 0) {
            alert('鏈夋枃浠朵笉绗﹀悎瑕佹眰锛屾棤娉曚笂浼狅紒');
        }
        angular.forEach(files, function (file) {
            file.upload = Upload.upload({
                url: FILE_URL + '/file',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + $rootScope.identity.token },
                file: file,
                data: { 'FileTypeCode': 1002 }
            }).then(successFunc, function (response) {
                if (response.status > 0) {
                    alert('涓婁紶澶辫触!' + response.status + ': ' + response.data);
                }
            }, function (evt) {

            });
        });
    };
    //姹囩エ姝ｉ潰鍥剧墖鏀惧ぇ鍔熻兘
    $scope.setFrontID = function (response) {
        $timeout(function () {
            $scope.model.bill_front_photo_id = response.data.data.id;
            $scope.model.bill_front_photo_path = response.data.data.file_path;
            $('.jqzoom_front').imagezoom();
        })
    };
    //姹囩エ鑳岄潰鍥剧墖鏀惧ぇ鍔熻兘
    $scope.setBackID = function (response) {
        $timeout(function () {
            $scope.model.bill_back_photo_id = response.data.data.id;
            $scope.model.bill_back_photo_path = response.data.data.file_path;
            $('.jqzoom_back').imagezoom();
        })
    };
    //姹囩エ姝ｉ潰鍥剧墖绉婚櫎鍔熻兘
    $scope.removeFront = function () {
        $scope.model.bill_front_photo_id = null;
        $scope.model.bill_front_photo_path = 'assets/img/hpx-14.jpg';
        $('.jqzoom_front').unbind("mouseenter");
        $('.jqzoom_front').css('cursor', '');
    }
    //姹囩エ鑳岄潰鍥剧墖绉婚櫎鍔熻兘
    $scope.removeBack = function () {
        $scope.model.bill_back_photo_id = null;
        $scope.model.bill_back_photo_path = 'assets/img/hpx-15.jpg';
        $('.jqzoom_back').unbind("mouseenter");
        $('.jqzoom_back').css('cursor', '');
    }
    //涓婁紶鍥剧墖鍚庯紝鐐瑰嚮鍥剧墖璺宠浆椤甸潰锛屾斁澶у浘鐗�
    $scope.showFront = function () {
        window.open('index.html#/img?path=' + $scope.model.bill_front_photo_path);
    }
    //涓婁紶鍥剧墖鍚庯紝鐐瑰嚮鍥剧墖璺宠浆椤甸潰锛屾斁澶у浘鐗�
    $scope.showBack = function () {
        window.open('index.html#/img?path=' + $scope.model.bill_back_photo_path);
    }



    $scope.save = function () {
        //鏍￠獙锛屾彁绀轰俊鎭�
        if (!$scope.model.bill_type_id) {
            alert("璇烽�夋嫨绁ㄦ嵁绫诲瀷");
            return;
        }

        if (!$scope.model.trade_type_code) {
            alert("璇烽�夋嫨浜ゆ槗鏂瑰紡");
            return;
        }

        if (!$scope.model.bill_sum_price) {
            alert("璇疯緭鍏ョエ闈㈤噾棰�");
            return;
        }

        if ($scope.model.trade_type_code == 701) {
            if (!$scope.model.bill_front_photo_id) {
                alert("璇蜂笂浼犳眹绁ㄦ闈�");
                return;
            }
        }
        else {
            if (!$scope.model.acceptor_type_id) {
                alert("璇烽�夋嫨鎵垮厬鏈烘瀯");
                return;
            }

            if (!$scope.model.acceptor_name) {
                alert("璇疯緭鍏ヤ粯娆捐鍏ㄧО");
                return;
            }

            if (!$scope.model.bill_deadline_time) {
                alert("璇疯緭鍏ユ眹绁ㄥ埌鏈熸棩");
                return;
            }

            if (!$scope.model.contact_name) {
                alert("璇疯緭鍏ヨ仈绯讳汉");
                return;
            }

            if (!$scope.model.contact_phone) {
                alert("璇疯緭鍏ヨ仈绯绘柟寮�");
                return;
            }
        }

        $scope.model.bill_flaw_ids = [];
        $scope.model.bill_type_id = parseInt($scope.model.bill_type_id);
        $scope.model.trade_type_code = parseInt($scope.model.trade_type_code);
         
        if ($scope.model.bill_type_id == 101) {
            for (var i = 0; i < $scope.billFlawData.length; i++) {
                if ($scope.billFlawData[i].checked) {
                    $scope.model.bill_flaw_ids.push($scope.billFlawData[i].code);
                }
            }
        }
        else {
            for (var i = 0; i < $scope.billFlawData2.length; i++) {
                if ($scope.billFlawData2[i].checked) {
                    $scope.model.bill_flaw_ids.push($scope.billFlawData2[i].code);
                }
            }
        }
        if (confirm('纭畾瑕佸彂甯冩眹绁ㄥ悧锛�')) {
            if (!$scope.model.id) {
                //鍙戝竷姹囩エ淇℃伅
                billService.insertBillProduct($scope.model).then(function (data) {
                    alert('鍙戝竷鎴愬姛锛岀瓑寰呭悗鍙板鏍革紙30鍒嗛挓浠ュ唴锛夈��');
                    $state.go("app.main.myBill");
                });
            } else {
                //淇敼姹囩エ淇℃伅
                billService.updateBillProduct($scope.model.id, $scope.model).then(function (data) {
                    alert('淇敼鎴愬姛锛岀瓑寰呭悗鍙板鏍革紙30鍒嗛挓浠ュ唴锛夈��');
                    $state.go("app.main.myBill");
                });
            }
        }
    }
});

hpxAdminApp.controller('queryBillController', function ($rootScope, $scope, $state, $stateParams, ngTableParams, addressService, billService, constantsService) {
    var emptyEntity = {};
    var newEntity = angular.copy(emptyEntity, newEntity);

    $scope.filter = {
        //billTypeAll: true,
        billStyleAll: true,
        acceptorTypeAll: true,
        billCharacterAll: true,
        billStatusAll: true,
        tradeTypeCode: '',
        billTypeID: '',
        billStatusCode: '800,801,802,803,804,805,806,807,808,809,810,811,812',
        billCharacterCode: ''
    };

    if ($stateParams.type == 101) {
        $scope.filter.billTypeID = 101;
    } else if ($stateParams.type == 102) {
        $scope.filter.billTypeID = 102;
    } else {
        $scope.filter.billTypeAll = true;
    }

 //鑾峰彇绁ㄦ嵁绫诲瀷
    constantsService.queryConstantsType(1).then(function (data) {
        $scope.billTypeData = data;
        $scope.billTypeData.unshift({ 'code': '', 'constant_name': '鍏ㄩ儴' });
        if ($stateParams.type) {
            $scope.filter.billTypeAll = false;
            for (var i = 0; i < $scope.billTypeData.length; i++) {
                if ($scope.billTypeData[i].code == $stateParams.type) {
                    $scope.billTypeData[i].checked = true;
                }
            }
            $scope.tableParams.reload();
        }
    });
    //鑾峰彇鎵垮厬鏈烘瀯绫诲瀷
    constantsService.queryConstantsType(4).then(function (data) {
        $scope.acceptorTypeData = data;
    });
    //鎵垮厬鏈烘瀯鍏ㄩ��
    $scope.acceptorTypeChangeAll = function () {
        for (var i = 0; i < $scope.acceptorTypeData.length; i++) {
            if($scope.filter.acceptorTypeAll) {
                $scope.acceptorTypeData[i].checked = false;

            }
        }
    };
    //閫変腑鏌愪釜閫夐」鏃讹紝鈥樺叏閮ㄢ�欎负涓嶅嬀閫夌姸鎬�
    $scope.acceptorTypeChange = function () {
        for (var i = 0; i < $scope.acceptorTypeData.length; i++) {
            if ($scope.acceptorTypeData[i].checked)
                $scope.filter.acceptorTypeAll = false;
        }
    };

    //鑾峰彇姹囩エ鐗圭偣绫诲瀷
    constantsService.queryConstantsType(14).then(function (data) {
        $scope.billCharacterData = data;
        $scope.billCharacterData.unshift({ 'code': '', 'constant_name': '鍏ㄩ儴' });
    });
    //鑾峰彇浜ゆ槗鏂瑰紡绫诲瀷
    constantsService.queryConstantsType(7).then(function (data) {
        $scope.tradeTypeData = data;
        $scope.tradeTypeData.unshift({ 'code': '', 'constant_name': '鍏ㄩ儴' });
    });
    //鑾峰彇鎵�鏈夌殑鐪佺骇鍦板潃
    addressService.queryAll().then(function (data) {
        $scope.ProvinceData = data;
        $scope.filterProvinceChange();
    });
    //鑾峰彇瀵瑰簲鐨勭渷涓嬫墍鏈夌殑甯傜骇鍦板潃
    $scope.filterProvinceChange = function () {
        if ($scope.filter.ProvinceID == null) {
            return;
        }
        else {
            return addressService.getCity($scope.filter.ProvinceID).then(function (data) {
                $scope.CityData = data;
            });
        }
    }
    
    $scope.tableParams = new ngTableParams({ 'sorting': { 'publishing_time ': 'desc' } }, {
        getData: function (params) {

            var acceptorTypeID = [];
            if (!$scope.filter.acceptorTypeAll) {           //鑾峰彇閫変腑鐨勬壙鍏戞満鏋�
                for (var i = 0; i < $scope.acceptorTypeData.length; i++) {
                    if ($scope.acceptorTypeData[i].checked) {
                        acceptorTypeID.push($scope.acceptorTypeData[i].code)
                    }
                }
            }
            $scope.filter.acceptorTypeID = acceptorTypeID.join(",");

            //鏌ョ湅绁ㄦ嵁
            return billService.searchBillProduct(params, 1, $scope.filter.billTypeID, $scope.filter.billStyleID, $scope.filter.billStatusCode, $scope.filter.acceptorTypeID, $scope.filter.CityID, $scope.filter.tradeTypeCode, $scope.filter.billCharacterCode, $scope.filter.billFlawID).then(function (data) {
                // $scope.first = $scope.getFirst(params);
                return data;
            });
        }
    });
    //鍒锋柊
    $scope.reflash = function () {
        $scope.tableParams.reload();
    }
    //濡傛灉id涓嶇瓑浜�0锛岃幏鍙栧搴攊d鐨勭エ鎹鎯�
    if ($stateParams.id) {
        billService.getBillProduct($stateParams.id).then(function (data) {
            $scope.model = data;
        });
    }
    //鎻愮ず淇℃伅
    $scope.Reminder = function () {
        alert('澶хエ鏄寚姹囩エ闈㈤澶т簬100涓囩殑鐢电エ銆佺焊绁ㄣ�俓n瓒虫湀鏄寚浠庡璇ラ摱琛屾壙鍏戞眹绁ㄨ繘琛岀數鏌ユ垨鑰呭疄鏌ュ綋鏃ヨ捣璁＄畻鍒拌姹囩エ绁ㄩ潰鍒版湡鏃ヤ箣闂寸殑澶╂暟锛屽埌鏈熸棩涓哄懆鏈垨鑰呮硶瀹氳妭鍋囨棩椤哄欢锛屽彟澶栧湪鍔犱笂寮傚湴鍦ㄩ��3鏃ワ紝绠楀ご涓嶇畻灏撅紝鎵�璁＄畻鍑烘潵鐨勫ぉ鏁�>180澶╋紝鍗充负瓒虫湀锛�');
    }
    //鏄剧ず璇︾粏淇℃伅
    $scope.show = function (data) {
        $scope.model = angular.copy(data);
    };
    //鑾峰彇瀵瑰簲id鐨勭エ鎹殑鍑轰环璁板綍淇℃伅
    $scope.showBidding = function (item) {
        billService.getBillProductBidding(item.id).then(function (data) {
            $scope.biddings = data;
            $scope.model = item;
            $('#modal-bidding').modal('show');
        });
    };
    //寮瑰嚭鍑轰环璁板綍绐楀彛
    $scope.showAddBidding = function (item) {
        $scope.biddingModel = {
            bill_product_id: $scope.model.id
        };
        $('#modal-addBidding').modal('show');
    };
    //鎾ら攢鎶ヤ环鍔熻兘
    $scope.cancelBidding = function (item) {
        if (confirm('纭畾瑕佹挙閿�鎶ヤ环鍚楋紵')) {
            billService.deleteBillBidding(item.id).then(function () {
                billService.getBillProductBidding($scope.model.id).then(function (data) {
                    $scope.biddings = data;
                });
            });
        }
    };
    //鎴戣鍑轰环鍔熻兘
    $scope.addBidding = function () {
        billService.insertBillBidding($scope.biddingModel).then(function (data) {
            alert('鍑轰环鎴愬姛锛�');
            //鑾峰彇鍑轰环璁板綍璇︽儏
            billService.getBillProductBidding($scope.model.id).then(function (data) {
                $scope.biddings = data;
                $('#modal-addBidding').modal('hide');
            });
        });
    };
});

hpxAdminApp.controller('queryOfferController', function ($rootScope, $scope, $stateParams, $state, $filter ,ngTableParams, billService, addressService, constantsService) {
    var emptyEntity = {};
    var newEntity = angular.copy(emptyEntity, newEntity);
    $scope.filter = {
        'billStyleId': 201,      //榛樿閫変腑閾剁焊澶хエ
    };
    //鑾峰彇绁ㄦ嵁绫诲瀷鏁版嵁
    constantsService.queryConstantsType(2).then(function (data) {
        $scope.billStyleData = data;
    });

    $scope.tableParams = new ngTableParams({ 'sorting': { 'offer_time': 'desc' } }, {
        getData: function (params) {
            var newdate = new Date();
            $scope.filter.publishingTimeS = $filter('date')(newdate, 'yyyy-MM-dd');     //璁剧疆鏃堕棿涓哄綋鍓嶆棩鏈�
            $scope.filter.publishingTimeB = $filter('date')(newdate, 'yyyy-MM-dd');
            //鑾峰彇褰撳墠鏃ユ湡鐨勬姤浠蜂俊鎭�
            return billService.searchBillOffer(params, $scope.filter.func, $scope.filter.publishingTimeS, $scope.filter.publishingTimeB, $scope.filter.billStyleId, $scope.filter.enterpriseName).then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    try {
                        data[i].offer_detail = JSON.parse(data[i].offer_detail);
                    }
                    catch (e) {
                    }
                }
                return data;
            });
        }
    });
    //鍒锋柊
    $scope.reflash = function () {
        $scope.tableParams.reload();
    };
});

hpxAdminApp.controller('quoteController', function ($rootScope, $scope, $timeout, $state, addressService, customerService, ngTableParams, billService, constantsService) {
    //鍒ゆ柇鏄惁鍙互鎶ヤ环
    if ($rootScope.identity.can_publish_offer != 1) {
        alert("鎮ㄦ殏鏃惰繕涓嶈兘鎶ヤ环锛�");
        window.history.back();
        return;
    }

    $scope.filter = { };
    //鑾峰彇鎵�鏈夋垜鐨勬姤浠蜂俊鎭�
    $scope.tableParams = new ngTableParams({ 'sorting': { 'offer_time ': 'desc' } }, {
        getData: function (params) {
            return billService.getOwnBillOffer(params, $scope.filter.billTypeId, $scope.filter.billStyleId, $scope.filter.maxPrice, $scope.filter.tradeLocationId, $scope.filter.keyword).then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    try {
                        data[i].offer_detail = JSON.parse(data[i].offer_detail);
                    }
                    catch (e) {
                    }
                }
                
                return data;
            });
        }
    });
    //鍒锋柊
    $scope.reflash = function () {
        $scope.tableParams.reload();
    };
    //鍒犻櫎鎶ヤ环
    $scope.remove = function (data) {
        if (confirm('纭畾瑕佸垹闄よ鎶ヤ环鍚楋紵')) {
            billService.deleteBillOffer(data.id).then(function (data) {
                $scope.tableParams.reload();
            });
        }
    }
    
    $scope.edit = function (data) {
        if (data == null) {         //璺宠浆鑷虫柊寤烘姤浠�
            $state.go('app.main.editQuote');
        }
        else {      //璺宠浆鍒版姤浠疯缁嗕俊鎭�
            $state.go('app.main.editQuote', { 'id': data.id });
        }
    };
});
hpxAdminApp.controller('readBillController', function ($rootScope, $scope, $state, $stateParams, ngTableParams, addressService, billService, constantsService, orderService) {
    $scope.filter = {
        'bill_front_photo_path': 'assets/img/hpx-14.jpg',
        'bill_back_photo_path': 'assets/img/hpx-15.jpg',
    };

    //鏍规嵁id鑾峰彇瀵瑰簲鐨勭エ鎹缁嗕俊鎭�
    if ($stateParams.id) {
        billService.getBillProduct($stateParams.id).then(function (data) {
            $scope.model = data;
            $('.jqzoom').imagezoom();

            //鏍规嵁鏉′欢鍒ゆ柇锛屾垚绔嬪垯鑾峰彇鍑轰环璁板綍
            if ($stateParams.id && $rootScope.identity && ($rootScope.identity.can_see_bill_detail == 1 || $scope.model.publisher_id == $rootScope.identity.customer_id)) {
                billService.getBillProductBidding($stateParams.id).then(function (data) {
                    $scope.biddings = data;
                });
            }
        });
    }

    //$scope.showAddBidding = function (item) {
    //    $scope.biddingModel = {
    //        bill_product_id: $scope.model.id,
    //        bill_type_id: $scope.model.bill_type_id,
    //    };
    //    $('#modal-addBidding').modal('show');
    //};

    //閫夋嫨浜ゆ槗鏂�
    $scope.finishBidding = function (item) {
        if (confirm('纭閫夋嫨璇ユ敹绁ㄤ汉杩涜浜ゆ槗鍚楋紵')) {
            billService.newOrderBidding({ 'bill_product_id': $scope.model.id, 'bill_product_bidding_id': item.id }).then(function (data) {
                alert('纭浜ゆ槗鏂规垚鍔燂紒');
                billService.getBillProduct($stateParams.id).then(function (data) {
                    $scope.model = data;
                    $('.jqzoom').imagezoom();

                    billService.getBillProductBidding($stateParams.id).then(function (data) {
                        $scope.biddings = data;
                    });
                });
            });
        }
    };

    //鎾ら攢鎶ヤ环
    $scope.cancelBidding = function (item) {
        if (confirm('纭畾瑕佹挙閿�鎶ヤ环鍚楋紵')) {
            billService.deleteBillBidding(item.id).then(function () {
                billService.getBillProductBidding($scope.model.id).then(function (data) {
                    $scope.biddings = data;
                });
            });
        }
    };
    //鏂板鎶ヤ环淇℃伅
    $scope.addBidding = function () {
        billService.insertBillBidding($scope.biddingModel).then(function (data) {
            alert('鍑轰环鎴愬姛锛�');
            $('#modal-addBidding').modal('hide');
            //if ($scope.model.id && identity && (identity.can_see_bill_detail == 1 || model.publisher_id == identity.customer_id)) {
                billService.getBillProductBidding($scope.model.id).then(function (data) {
                    $scope.biddings = data;
                });
            //}
        });
    };

    $scope.showAddBidding = function (item) {
        $scope.biddingModel = {
            bill_product_id: $scope.model.id
        };
        $('#modal-addBidding').modal('show');
    };
});

hpxAdminApp.controller('readOfferController', function ($rootScope, $scope, $state, $stateParams, ngTableParams, addressService, billService, constantsService) {
    //根据id获取报价详细信息
    if ($stateParams.id) {
        billService.getBillOffer($stateParams.id).then(function (data) {
            $scope.model = data;
            try {
                $scope.model.offer_detail = JSON.parse($scope.model.offer_detail);
            }
            catch (e) {
            }
        });
    }
});

hpxAdminApp.controller('readOrderController', function ($rootScope, $stateParams, $scope, $state, API_URL, ngTableParams, orderService, customerService) {
    var emptyEntity = {};
    var newEntity = angular.copy(emptyEntity, newEntity);

    $scope.filter = {};

    if ($stateParams.id != 0) {
        orderService.getOrder($stateParams.id).then(function (data) {
            $scope.model = data;
        });
    };

});

hpxAdminApp.controller('rechargeController', function ($scope, $rootScope, $state, API_URL, ngTableParams, payingService) {
    var emptyEntity = {};
    var newEntity = angular.copy(emptyEntity, newEntity);

    $scope.filter = { };
    //鑾峰彇璐︽埛鍏呭�艰褰�
    $scope.tableParams = new ngTableParams({ 'sorting': { 'change_time': 'desc' } }, {
        getData: function (params) {
            return payingService.platformAccountBalance(params).then(function (data) {
                $scope.first = $scope.getFirst(params);
                return data;
            });
        }
    });
    //鑾峰彇璐︽埛浣欓
    payingService.GetPlatformAccount().then(function (data) {
        $scope.model= data;
    });
    //鍒锋柊
    $scope.reflash = function () {
        $scope.tableParams.reload();
    }
    //寮瑰嚭鍏呭�肩獥鍙�
    $scope.recharge = function () {
        $scope.model = newEntity;
        $('#modal-edit').modal('show');
    };
    //鎵撳紑涓�涓柊椤甸潰锛岃繘琛屽厖鍊兼椿鍔�
    $scope.submit = function () {
        window.open(API_URL + '/paying/recharge?rechargePrice=' + $scope.model.recharge_price + '&customerId=' + $rootScope.identity.customer_id);
        $('#modal-edit').modal('hide');
    };
});
hpxAdminApp.controller('signupController', function ($rootScope, $scope, $state, $interval, billService, customerService,constantsService) {  
    $scope.model = {};
    $scope.verifyStr = "鑾峰彇楠岃瘉鐮�";
    $scope.disableVerify = false;
    //鑾峰彇瀹㈡埛鐨勭被鍨�
    constantsService.queryConstantsType(3).then(function (data) {
        $scope.customerTypeCcode = data;
    })
    //鑾峰彇浜ゆ槗鏂瑰紡鐨勭被鍨�
    constantsService.queryConstantsType(11).then(function (data) {
        $scope.tradeLevelCcode = data;
    })

    var second = 90;
    //鍙戦�侀獙璇佺爜
    $scope.getVerify = function () {
        if (!$scope.model.phone_number || $scope.model.phone_number.length != 11) {
            alert('璇疯緭鍏ユ纭殑鎵嬫満鍙风爜锛�');
            return;
        }

        customerService.phoneVerify($scope.model.phone_number).then(function () {
            alert('楠岃瘉鐮佸凡鍙戦��');
            $scope.second = 90;
            $scope.disableVerify = true;

            $interval(function () {
                $scope.verifyStr = $scope.second + "绉掑悗鍙噸鏂拌幏鍙�";
                $scope.second--;

                if ($scope.second == 0) {
                    $scope.verifyStr = "閲嶆柊鑾峰彇楠岃瘉鐮�";
                    $scope.disableVerify = false;
                }
            }, 1000, 90);
        })
    };

    $scope.signup = function () {
        if (!$scope.model.phone_number || $scope.model.phone_number.length != 11) {
            alert('璇疯緭鍏ユ墜鏈哄彿鐮侊紒');
            return;
        }

        if (!$scope.model.password || $scope.model.password.length == 0) {
            alert('璇疯緭鍏ュ瘑鐮侊紒');
            return;
        }

        if ($scope.model.password != $scope.model.password2) {
            alert("涓ゆ瀵嗙爜杈撳叆涓嶄竴鑷达紒");
            return;
        }

        if (!$scope.model.phone_verify_code || $scope.model.phone_verify_code.length == 0) {
            alert('璇疯緭鍏ラ獙璇佺爜锛�');
            return;
        }
        //娉ㄥ唽鍔熻兘
        customerService.customerReg($scope.model).then(function (data) {
            alert("娉ㄥ唽鎴愬姛!");
            $scope.loginRequest = {
                username: $scope.model.phone_number,
                password: $scope.model.password
            }
            //鏂板缓璐︽埛淇℃伅
            customerService.customerLogin($scope.loginRequest).then(function (data) {
                localStorageService.set('customer', data);

                $rootScope.identity = data;
                Restangular.setDefaultHeaders({ 'Authorization': 'Bearer ' + data.token });
                $state.go('app.main.accountInfo');      //璺宠浆鍒颁釜浜轰腑蹇�
            });
            $state.go("home");          //璺宠浆鍒伴椤�
        });
    }
    //娉ㄥ唽鎴愬姛璺宠浆鍒伴椤�
    $scope.tosignon = function () {
        $state.go("home");
    }
});
