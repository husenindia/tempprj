jQuery(document).ready(function ($) {
    /* DESKTOP MOBILE MODE SELECTOR JS ******************/
    // 0 = mobileview // 1 = desktopview

    viewMode = readCookie('viewmode');
    if (viewMode === null) {
        viewMode = 0;
    }
    console.log('currentmode' + viewMode);
    if (viewMode == 0) {
        $('head').append('<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />');
    } else {
        $('meta[name="viewport"]').remove();
        $('meta[name="viewport"]').remove();
    }

    jQuery('#viewdesktop').click(function () {
        createCookie('viewmode', 1, 1);
        // $('#viewmobile').show();
        location.reload(true);
    })
    jQuery('#viewmobile').click(function () {
        createCookie('viewmode', 0, 1);
        //$('#viewdesktop').show();
        location.reload(true);
    })
    /* ENDED *******************************************/


	jQuery("#MenuLinksBtn").click(function () {
		jQuery("#access").toggle();
	});

	jQuery('.NewsTitleLinkOpen').on('click', function (e) {
		jQuery('.NewsBox ul').slideToggle("NewsTitleLinkClose");
		jQuery('.NewsTitleLinkOpen').toggleClass("NewsTitleLinkClose"); 
		e.preventDefault();
	});
	
	jQuery('.ActivityLinkOpen').on('click', function(e) {
		jQuery('.ActivityBox ul').slideToggle("ActivityLinkClose");
		jQuery('.ActivityLinkOpen').toggleClass("ActivityLinkClose"); 
		e.preventDefault();
	});

	var timerFlag = false;
	var waitInterval = 500;
	jQuery("#secondary").on('DOMSubtreeModified propertychange', function() {
		//AD
		//this event is fired too much times in tiny amount of time, so constructed a timer mechanism
		//clear timer
		
		clearTimeout(timerFlag);
		timerFlag = setTimeout(adjustSectionHeight, waitInterval);
	});
	adjustSectionHeight();
	
	/*side menu accordion*/
	
	jQuery('#menu-side-menu > li.menu-item-has-children > a').click(function(event) {
		var $this = jQuery(this);
		var $parentLi = $this.parent();
		
		if($parentLi.hasClass('current-menu-item') || $parentLi.hasClass('current-menu-ancestor')) {
			$parentLi.removeClass('current-menu-item').removeClass('current-menu-ancestor');
		} else {
			//remove classes from all the siblings of parent
			$parentLi.siblings().removeClass('current-menu-item').removeClass('current-menu-ancestor');
			$parentLi.addClass('current-menu-item').addClass('current-menu-ancestor');
		}
		event.preventDefault();
		return false;
	});
	
	//company listing page
	
	/*jQuery(".AtoZ a").bind('click', function () {
		var correspondingDivIndex = jQuery(this).index();
		if (correspondingDivIndex == 0) {
			//show all divs
			jQuery(".ProductListContainer .SummaryListing").show();
			adjustSectionHeight();
			return false;
		}
		correspondingDivIndex = correspondingDivIndex - 1;
		//hide all divs
		jQuery(".ProductListContainer .SummaryListing").hide();
		//loop throgh divs and show only the corresponding div
		jQuery(".ProductListContainer").find('.SummaryListing').each(function (divIndex, divValue) {
			if (correspondingDivIndex == divIndex) {
				jQuery(divValue).show();
				//break;
			}
		});
		adjustSectionHeight();
		return false;
	});*/
});


function adjustSectionHeight() {
	jQuery('#primary').height('auto');
	jQuery('#secondary').height('auto');
	var highestCol = Math.max(jQuery('#secondary').height(), jQuery('#primary').height());
	if(highestCol != jQuery('#primary').height()) {
		jQuery('#primary').height(highestCol);
	}
	if(highestCol != jQuery('#secondary').height()) {
		jQuery('#secondary').height(highestCol);
	}
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}