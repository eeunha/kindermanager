function getCookie(name) {
	var i, x, y, ARRcookies = document.cookie.split(";");
	for ( i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == name) {
			return unescape(y);
		}
	}
}

// 쿠키 설정
// @param cookieName 쿠키명
// @param cookieValue 쿠키값
// @param expireDay 쿠키 유효날짜
function setCookie(cookieName, cookieValue) {
	document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/;";
}

// 쿠키 삭제
// @param cookieName 삭제할 쿠키명
function deleteCookie(cookieName) {
	var expireDate = new Date();
	//어제 날짜를 쿠키 소멸 날짜로 설정한다.
	expireDate.setDate(expireDate.getDate() - 1);
	document.cookie = cookieName + "=" + ";expires=" + expireDate.toGMTString() + "; path=/";
}

// 자신이 지정한 값으로 쿠키 설정
function setMyCookie() {
	setCookie(form.setName.value, form.setValue.value, form.expire.value);
	viewCookie();
	// 전체 쿠키 출력 갱신
}

// 자신이 지정한 쿠키명으로 확인
function getMyCookie() {
	alert("쿠키 값 : " + getCookie(form.getName.value));
}

// 자신이 지정한 쿠키명으로 쿠키 삭제
function deleteMyCookie() {
	deleteCookie(form.deleteName.value);
	alert("쿠키가 삭제되었습니다.");
}

// 전체 쿠키 출력
function viewCookie() {
	if (document.cookie.length > 0) {
		cookieOut.innerText = document.cookie;
	} else {
		cookieOut.innerText = "저장된 쿠키가 없습니다.";
	}
}