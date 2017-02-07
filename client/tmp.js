
console.log('injected');

function selectQty(obj) {
	if(overviewMode == 'HS')
	{
		// document.cookie = "s_sq=sisprod%3D%2526pid%253Dhttps%25253A//www2.hkticketing.com/HKTWebApp/Booking.do%2526oid%253DCONTINUE%2526oidt%253D3%2526ot%253DSUBMIT"

		showCaptchaLightBox(obj);
		$r("#modalCaptchacontainer").slideDown('fast');
		 document.getElementById('captchaActionAfter').value = 'selectQty';
		 tmpObj = obj;
		// var obj = tmpObj;
		
		// obj.siblings().removeClass("selected"); // First remove the selected class from previous selection
		// obj.addClass("selected").parents().prev(".select").text(obj.text());
		// obj.parents().nextAll("select").find("option").val(obj.text());
		// obj.parents(".activedropdown").hide(); // Hide ul
		// updateBookingSummary(3, 1, obj.text(), 1,'');
		// reset_detailedSeatMap();
		// //updated by shenghou 20130612 - switch from to BA mode if user select Choose Seats For Me in SP mode
		// if(overviewMode == 'SP' && currentMode == 'BA') {
		// 	loadDetailSeatMap(getProductCode(), getPriceCatId(), getSeatSectionId(), getQuantity(), currentMode, getPClassPromoEventList());
		// }else {
		// 	loadDetailSeatMap(getProductCode(), getPriceCatId(), getSeatSectionId(), getQuantity(), overviewMode, getPClassPromoEventList());
		// }
	}
	 else
	{
		obj.siblings().removeClass("selected"); // First remove the selected class from previous selection
		obj.addClass("selected").parents().prev(".select").text(obj.text());
		obj.parents().nextAll("select").find("option").val(obj.text());
		obj.parents(".activedropdown").hide(); // Hide ul
		updateBookingSummary(3, 1, obj.text(), 1,'');
		reset_detailedSeatMap();
		//updated by shenghou 20130612 - switch from to BA mode if user select Choose Seats For Me in SP mode
		if(overviewMode == 'SP' && currentMode == 'BA') {
			loadDetailSeatMap(getProductCode(), getPriceCatId(), getSeatSectionId(), getQuantity(), currentMode, getPClassPromoEventList());
		}else {
			loadDetailSeatMap(getProductCode(), getPriceCatId(), getSeatSectionId(), getQuantity(), overviewMode, getPClassPromoEventList());
		}
	}
	return false;
}


//Ajax Retrieve Password
function verifyCaptcha() {
	console.log('changed');
	// document.cookie = "s_sq=sisprod%3D%2526pid%253Dhttps%25253A//www2.hkticketing.com/HKTWebApp/Booking.do%2526oid%253DCONTINUE%2526oidt%253D3%2526ot%253DSUBMIT";

	// var recaptcha_challenge   = document.getElementById("recaptcha_challenge_field").value;
	// var recaptcha_response   = document.getElementById("recaptcha_response_field").value;
	document.getElementById("captchaResult").value = 'false';
//s_sq=sisprod%3D%2526pid%253Dhttps%25253A//www2.hkticketing.com/HKTWebApp/Booking.do%2526oid%253DCONTINUE%2526oidt%253D3%2526ot%253DSUBMIT
	var recaptcha_challenge = "03AHJ_VuuFnx3Y8CuWzTMaRDQREiQNHSqCdk8LNn2sj0WP3_XrU_0qqWG-93AhyiRj76DXypEJMUG5hjsuLe2hsaLAaX0Ka-obYsx4FJR7kgb4Ol_FNXLRNPCvot53JqxK5NuibLo9aP4Vb8hr6-o1dto783pBGg6xUa1siUh02j7f3jUsoWXfjxE";
	var recaptcha_response = "MAXS C301";
	$r.ajax({
		url: SISTIC_API_DomainName + 'verifyCaptcha.do',
		type: 'post',
		data: {	continueBtn: 'Continue', 
				recaptcha_challenge_field: recaptcha_challenge, 
				recaptcha_response_field: recaptcha_response
				},
		cache: 'false',
		dataType: 'json',
		success: function(data) {
			console.log('data:');
			console.log(data);
			result = showAjaxReturnErrMsg(data);
			var status = getAjaxReturnMsg(data, 'status');
			//var retrieveemail = getAjaxReturnMsg(data, 'retrieveemail');
								
			if(status == '1') {
				
				
				document.getElementById("captchaResult").value = 'true';
				captchaComplete();
				
			}else if(status == '0') {
				document.getElementById("captchaResult").value = 'true';
				var returnMsg = getAjaxReturnMsg(data, 'err_captcha');
				document.getElementById("err_captcha").parentNode.className = "error";
				document.getElementById("err_captcha").innerHTML = returnMsg;

				
			}
				
		 },
		error: function (request, textStatus, errorThrown) {
			alert('Connection error. Please try again.');
			//alert(request.statusText);
			//alert(request.status);
			//alert(errorThrown);     
			//alert(SISTIC_API_DomainName + 'patronForgotPassword.do');
		},
		complete: function (xhr, status) {
			console.log('complete');
			console.log(status);
			console.log(xhr.responseText);
			if (status == 'error' || !xhr.responseText) {
			//	alert('complete error');
			}
			else {
				var data = xhr.responseText;
			}
		}
	});
	// document.getElementById("captchaResult").value = 'true';
	// captchaComplete();
}


function loadDetailSeatMap(productCode, priceCatId, seatSectionId, quantity, mode,pClassPromoEventList) {
//s_sq=sisprod%3D%2526pid%253Dhttps%25253A//www2.hkticketing.com/HKTWebApp/Booking.do%2526oid%253DCONTINUE%2526oidt%253D3%2526ot%253DSUBMIT

    //RetrieveDetailSeatMap API call
	$p('.detailLoading').show();
	disableOverviewOnly();
	$p('#imageavailable').hide();		
	$p('#noimage').hide();
	
    $p.ajax({
        url: SISTIC_API_DomainName + 'retrieveDetailSeatmap.do',
        type: 'get',
        data: { jsondata: "{ 'productCode': " + productCode + ", 'priceCatId': " + priceCatId + ", 'seatSectionId': " + seatSectionId + ", 'quantity': " + getQuantity() + ", 'mode': " + mode + ", 'specialCode': '" + getSpecialCode() +  "', 'pClassPromoEventList':'" + pClassPromoEventList + "'}" },
        cache: false,
        dataType: 'json',
        success: function(data) {
			//updated by shenghou 20130612
			if(overviewMode == 'SP') {
				currentMode = mode;
			}
            if (data && data.status == 1) {

				if(mode == 'SP' && quantity == 0) {
					//updated by shenghou 20130612
					currentMode = "BA";	//end
					$j('#step4refresh').hide();
					$j('.b-step4').find('div.num-h').text(4);
					$j('.b-step5').find('div.num-h').text(5);
					resetSteps(2);
					window.setTimeout(function() {
						$j('.b-step3').show();
						$j("#steptwo a.book-r").show();

						activestep('.b-step2','.b-step3');
						//updated by shenghou 20130625
						goToStep($j("#stepthree h5 a"),'.b-step3', true);
					}, pauseSec);
				}else {
	                jAlert(data.statusMessage, document.getElementById("ml_err_seat").value, function (e) {
							//updated by shenghou 20130625
							goToStep($j("#stepthree h5 a"),'.b-step3', true);
	                		$p('.b-step4').hide();
	                	}
	                );
	                $p('.detailLoading').hide();
	            }
            }
            else {
				tempResponseData = data;
                resetDetailedScroll();
                detailedMode = mode;
                
                if (detailedMode != 'SP') {
	                startTimer();
                    jQuery("#countergo").slideDown("slow");					
				}
				
				//updated by shenghou to display only 1 set of seats offered
				setSelected = 0;
	
				if(getSeatSectionId() == -1 && detailedMode == "BA" && data.setsReservedList.length >1) {
					if(data.setsReservedList[0].sectionId != data.setsReservedList[1].sectionId) {
						differentSectionOffered = true;
						//setSelected = 0;
						$p("#sectionval").append(data.setsReservedList[0].setsReserved[0].seatSectionAlias + "/ " + data.setsReservedList[1].setsReserved[0].seatSectionAlias)
					}else {
						//alert("false");
						differentSectionOffered = false;
						$p("#sectionval").append(data.setsReservedList[0].setsReserved[0].seatSectionAlias);
					}
				}else if (getSeatSectionId() == -1 && detailedMode == "HS"){
					$p("#sectionval").append(data.setsReservedList[0].setsReserved[0].seatSectionAlias)
					differentSectionOffered = false;
				}else {
					differentSectionOffered = false;
				}
				if(overviewMode != 'SP' && firstHint) {
					var offf = $v('#stepfour').position();
					//$v("div.bookingHint").css('top', offf.top-7+'px');
					//$v("div.bookingHint").show();
				}
				if(differentSectionOffered) {
                	initDetailSeatMapUI(data, 0);
				}else {
	                initDetailSeatMapUI(data);
	            }
            }
            enableOverviewOnly();
            			
        },
        error: function(e) {
        	$p('.detailLoading').hide();
        	enableOverviewOnly();
        	jAlert(stdErrorMsg, stdErrorHeader);
        }
    });
}
