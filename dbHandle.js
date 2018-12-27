// 데이터베이스 생성 및 열기
function openDB() {
	db = window.openDatabase('kidsDB', '1.0', '유치원DB', 1024 * 1024);
	console.log('1_DB 생성...');
}

// 테이블 생성 트랜잭션 실행
function createTable() {// location의 i_time을 l_time으로 바꿈
	db.transaction(function(tr) {
		var createSQL_teacher = 'create table if not exists teachers(teacher_id integer primary key autoincrement, t_id varchar(20) not null unique, t_password varchar(20) not null, t_name varchar(20) not null, t_email varchar(50), t_phone varchar(20), t_ban varchar(20))';
		var createSQL_parent = 'create table if not exists parents(parent_id integer primary key autoincrement, p_id varchar(20) not null unique, p_password varchar(20) not null, p_email varchar(50), p_phone varchar(20), p_kidban varchar(20), p_kidname varchar(20))';
		var createSQL_ban = 'create table if not exists bans(ban_id integer primary key autoincrement, b_name varchar(20) not null unique, b_teacher varchar(20), FOREIGN KEY(b_teacher) REFERENCES teachers(t_id) ON DELETE CASCADE)';
		var createSQL_kid = 'create table if not exists kids(kid_id integer primary key autoincrement, k_ban varchar(20) not null, k_name varchar(20) not null, k_parent varchar(50), FOREIGN KEY(k_ban) REFERENCES bans(b_name) ON DELETE CASCADE, FOREIGN KEY(k_parent) REFERENCES parents(p_id) ON DELETE CASCADE)';
		var createSQL_inout = 'create table if not exists inouts(inout_id integer primary key autoincrement, i_ban varchar(20) not null, i_name varchar(20) not null, i_inout varchar(50), i_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(i_ban) REFERENCES bans(b_name) ON DELETE CASCADE)';
		var createSQL_allday = 'create table if not exists alldays(allday_id integer primary key autoincrement, a_ban varchar(20) not null, a_teacher varchar(50), a_title varchar(255), a_content text, FOREIGN KEY(a_ban) REFERENCES bans(b_name) ON DELETE CASCADE, FOREIGN KEY(a_teacher) REFERENCES teachers(t_name) ON DELETE CASCADE)';
		var createSQL_location = 'create table if not exists locations(location_id integer primary key autoincrement, l_ban varchar(20) not null, l_teacher varchar(20) not null, l_latitude real, l_longitude real, FOREIGN KEY(l_ban) REFERENCES bans(b_name) ON DELETE CASCADE, FOREIGN KEY(l_teacher) REFERENCES teachers(t_name) ON DELETE CASCADE)';

		tr.executeSql(createSQL_teacher, [], function() {
			console.log('2_1_ teachers 테이블생성_sql 실행 성공...');
		}, function() {
			console.log('2_1_ eachers 테이블생성_sql 실행 실패...');
		});

		tr.executeSql(createSQL_parent, [], function() {
			console.log('2_1_ parents 테이블생성_sql 실행 성공...');
		}, function() {
			console.log('2_1_ parents 테이블생성_sql 실행 실패...');
		});

		tr.executeSql(createSQL_ban, [], function() {
			console.log('2_1_ bans 테이블생성_sql 실행 성공...');
		}, function() {
			console.log('2_1_ bans 테이블생성_sql 실행 실패...');
		});

		tr.executeSql(createSQL_kid, [], function() {
			console.log('2_1_ kids 테이블생성_sql 실행 성공...');
		}, function() {
			console.log('2_1_ kids 테이블생성_sql 실행 실패...');
		});

		tr.executeSql(createSQL_inout, [], function() {
			console.log('2_1_ inouts 테이블생성_sql 실행 성공...');
		}, function() {
			console.log('2_1_ inouts 테이블생성_sql 실행 실패...');
		});

		tr.executeSql(createSQL_allday, [], function() {
			console.log('2_1_ alldays 테이블생성_sql 실행 성공...');
		}, function() {
			console.log('2_1_ alldays 테이블생성_sql 실행 실패...');
		});

		tr.executeSql(createSQL_location, [], function() {
			console.log('2_1_ locations 테이블생성_sql 실행 성공...');
		}, function() {
			console.log('2_1_ locations 테이블생성_sql 실행 실패...');
		});

	}, function() {
		console.log('2_2_테이블 생성 트랜잭션 실패...롤백은 자동');
	}, function() {
		console.log('2_2_테이블 생성 트랜잭션 성공...');
	});
}

// 테이블 기본 정보 저장
function insertBasicTable() {
	db.transaction(function(tr) {
		// 반 정보
		var banName1 = "풀잎반";
		var banName2 = "꽃잎반";
		var banName3 = "햇살반";
		var teacher1 = "채성아";
		var teacher2 = "나미리";
		var teacher3 = "차은주";
		// 아이 정보
		var kidName1 = "철수";
		var kidName2 = "맹구";
		var kidName3 = "훈이";
		var kidName4 = "유리";
		var kidName5 = "짱구";
		var kidBan1 = "풀잎반";
		var kidParent1 = "p1";
		var kidParent2 = "p2";
		var kidParent3 = "p3";
		var kidParent4 = "p4";
		var kidParent5 = "p5";

		var insertBanSQL = 'insert into bans(b_name, b_teacher) values(?,?)';
		// var insertBanSQL2 = 'insert into bans(b_name, b_teacher) values(?,?)';
		// var insertBanSQL3 = 'insert into bans(b_name, b_teacher) values(?,?)';

		var insertKidSQL = 'insert into kids(k_ban, k_name, k_parent) values(?,?,?)';
		// var insertKidSQL2 = 'insert into kids(k_ban, k_name, k_parent) values(?,?,?)';
		// var insertKidSQL3 = 'insert into kids(k_ban, k_name, k_parent) values(?,?,?)';

		// 반 데이터 저장
		tr.executeSql(insertBanSQL, [banName1, teacher1], function(tr, rs) {
			console.log('3_1_1_ 풀잎반 정보 등록 성공...');
		}, function() {
			console.log('3_1_1_ 풀잎반 정보 등록 실패...');
		});
		tr.executeSql(insertBanSQL, [banName2, teacher2], function(tr, rs) {
			console.log('3_1_2_ 꽃잎반 정보 등록 성공...');
		}, function() {
			console.log('3_1_2_ 꽃잎반 정보 등록 실패...');
		});
		tr.executeSql(insertBanSQL, [banName3, teacher3], function(tr, rs) {
			console.log('3_1_3 _햇살반 정보 등록 성공...');
		}, function() {
			console.log('3_1_3_ 햇살반 정보 등록 실패...');
		});

		// 아이 데이터 저장
		tr.executeSql(insertKidSQL, [kidBan1, kidName1, kidParent1], function(tr, rs) {
			console.log('3_2_1_ 원아 정보 등록 성공...');
		}, function() {
			console.log('3_2_1_ 원아 정보 등록 실패...');
		});
		tr.executeSql(insertKidSQL, [kidBan1, kidName2, kidParent2], function(tr, rs) {
			console.log('3_2_1_ 원아 정보 등록 성공...');
		}, function() {
			console.log('3_2_1_ 원아 정보 등록 실패...');
		});
		tr.executeSql(insertKidSQL, [kidBan1, kidName3, kidParent3], function(tr, rs) {
			console.log('3_2_1_ 원아 정보 등록 성공...');
		}, function() {
			console.log('3_2_1_ 원아 정보 등록 실패...');
		});
		tr.executeSql(insertKidSQL, [kidBan1, kidName4, kidParent4], function(tr, rs) {
			console.log('3_2_1_ 원아 정보 등록 성공...');
		}, function() {
			console.log('3_2_1_ 원아 정보 등록 실패...');
		});
		tr.executeSql(insertKidSQL, [kidBan1, kidName5, kidParent5], function(tr, rs) {
			console.log('3_2_1_ 원아 정보 등록 성공...');
		}, function() {
			console.log('3_2_1_ 원아 정보 등록 실패...');
		});

		// tr.executeSql(insertBanSQL1, [banName2, teacher1], function(tr, rs) {
		// console.log('3_1_1_ 풀잎반 정보 등록 성공...');
		// }, function() {
		// console.log('3_1_1_ 풀잎반 정보 등록 실패...');
		// });
		// tr.executeSql(insertBanSQL1, [banName3, teacher1], function(tr, rs) {
		// console.log('3_1_1_ 풀잎반 정보 등록 성공...');
		// }, function() {
		// console.log('3_1_1_ 풀잎반 정보 등록 실패...');
		// });

	});
}

// 교사 회원가입
function insertTeacher() {
	db.transaction(function(tr) {
		var id = $('#teacherId').val();
		var password = $('#teacherPwd').val();
		var name = $('#teacherName').val();
		var email = $('#teacherEmail').val();
		var phone = $('#teacherPhone').val();
		var ban = $('#teacherClass option:selected').text();
		var insertSQL = 'insert into teachers(t_id, t_password, t_name, t_email, t_phone, t_ban) values(?,?,?,?,?,?)';
		tr.executeSql(insertSQL, [id, password, name, email, phone, ban], function(tr, rs) {
			console.log('3_ 교사 회원가입 등록...no: ' + rs.insertId);
			// alert('맛집명 ' + $('#teacherId').val() + ' 이(가) 입력되었습니다');
			alert('교사 ' + $('#teacherName').val() + ' 이(가) 회원가입 되었습니다');
			location.href = "main.html";
		}, function() {
			alert('교사 ' + $('#teacherId').val() + ' 이(가) 회원가입에 실패하였습니다');
		});
	});
}

// 학부모 회원가입
function insertParent() {
	db.transaction(function(tr) {
		var id = $('#parentId').val();
		var password = $('#parentPwd').val();
		var passwordCheck = $('#parentPwdCheck').val();
		var email = $('#parentEmail').val();
		var phone = $('#parentPhone').val();
		var kid_ban = $('#childClass option:selected').text();
		console.log('kid_ban: ' + kid_ban);
		var kid_name = $('#childName').val();
		var insertSQL1 = 'insert into parents(p_id, p_password, p_email, p_phone, p_kidban, p_kidname) values(?,?,?,?,?,?)';
		tr.executeSql(insertSQL1, [id, password, email, phone, kid_ban, kid_name], function(tr, rs) {
			console.log('3_ 학부모 회원가입 등록...no: ' + rs.insertId);
			// alert('맛집명 ' + $('#teacherId').val() + ' 이(가) 입력되었습니다');
			alert($('#childName').val() + ' 학부모님이 회원가입 되었습니다');
			location.href = "main.html";
		}, function() {
			alert($('#childName').val() + ' 학부모님이 회원가입에 실패하였습니다');
		});
	});
}

// 로그인 기능
function searchLogin() {
	db.transaction(function(tr) {
		var role = $('input[name="role"]:checked').val();
		var id = $('#parentId').val();
		var pwd = $('#parentPwd').val();

		if (role == "학부모") {
			var selectSQL_parent = 'select p_id, p_password from parents where p_id=?';
			tr.executeSql(selectSQL_parent, [id], function(tr, rs) {
				console.log('4_ 학부모 로그인 조회...');
				var pid = rs.rows.item(0).p_id;
				var ppwd = rs.rows.item(0).p_password;

				if (id == pid && pwd == ppwd) {
					alert('학부모 ' + $('#parentId').val() + ' 님이 로그인 되었습니다');
					location.href = "Pmenu.html";
				} else {
					alert('아이디 혹은 비밀번호가 틀렸습니다. 다시 입력해주세요.');
				}
			}, function() {
				alert('등록된 정보가 없습니다.');
			});
		} else {
			var selectSQL_teacher = 'select t_id, t_password from teachers where t_id=?';
			tr.executeSql(selectSQL_teacher, [id], function(tr, rs) {
				console.log('4_ 교사 로그인 조회... ');
				var tid = rs.rows.item(0).t_id;
				var tpwd = rs.rows.item(0).t_password;

				if (id == tid && pwd == tpwd) {
					alert('교사 ' + $('#parentId').val() + ' 님이 로그인 되었습니다');
					location.href = "Tmenu.html";
				} else {
					alert('아이디 혹은 비밀번호가 틀렸습니다. 다시 입력해주세요.');
				}
			}, function() {
				alert('등록된 정보가 없습니다.');
			});
		}
	});
}

// 교사 위치정보 저장
function insertLocation(lat, lng) {
	db.transaction(function(tr) {
		var user_id = getCookie('uid');
		var tBan = "초기";
		var tName = "초기";
		alert(lat + ", " + lng);

		var selectSQL_t = 'select t_name, t_ban from teachers where t_id=?';
		tr.executeSql(selectSQL_t, [user_id], function(tr, rs) {
			console.log('5_ 교사 정보 조회... ');
			tName = rs.rows.item(0).t_name;
			tBan = rs.rows.item(0).t_ban;
			// var tName1 = rs.rows.item(0).t_name;
			// var tBan1 = rs.rows.item(0).t_ban;
			// tName2 = tName1;
			// tBan2 = tBan1;
			// console.log('tName1= ' + tName2 + ' tBan1=' + tBan2);
			console.log('tName= ' + tName + ' tBan=' + tBan);
		}, function() {
			alert('등록된 정보가 없습니다.');
		});

		// setTimeout(function() {
		// alert("one seconds");
		// }, 1500);
		var insertSQLLo = 'insert into locations(l_ban, l_teacher, l_latitude, l_longitude) values(?,?,?,?)';
		tr.executeSql(insertSQLLo, [tBan, tName, lat, lng], function(tr, rs) {
			console.log('5_ 교사 현재 위치 등록...no: ' + rs.insertId);
			// alert('위치추적이 시작되었습니다');
			// location.href = "Tmenu.html";
		}, function(posError) {
			alert('Error Code : ' + posError + ' / Error Message : ' + posError.message);
			alert('위치추적이 취소되었습니다.');
		});

		// alert('tBan =' + tBan2 + ' tName =' + tName2 + ' lat =' + lat + ' lng =' + lng);
		// console.log('tBan =' + tBan2 + ' tName =' + tName2 + ' lat =' + lat + ' lng =' + lng);
		// var insertSQLLo = 'insert into locations(l_ban, l_teacher, l_latitude, l_longitude) values(?,?,?,?)';
		// tr.executeSql(insertSQLLo, [tBan2, tName2, lat, lng], function(tr, rs) {
		// console.log('5_ 교사 현재 위치 등록...no: ' + rs.insertId);
		// alert('위치추적이 시작되었습니다');
		// // location.href = "Tmenu.html";
		// }, function(posError) {
		// alert('Error Code : ' + posError + ' / Error Message : ' + posError.message);
		// alert('위치추적이 취소되었습니다.');
		// });
	});
}

// 교사 위치 가져오기
function getTlocation() {
	db.transaction(function(tr) {
		// getCookie('uid');

		var selectSQL_id = 'select l_latitude, l_longitude from locations ORDER BY location_id DESC';
		tr.executeSql(selectSQL_id, [], function(tr, rs) {
			console.log('5_ 교사 정보 조회... ');
			latitude = rs.rows.item(0).l_latitude;
			longitude = rs.rows.item(0).l_longitude;

			onSuccess_p(latitude, longitude);
		}, function() {
			alert('등록된 정보가 없습니다.');
		});

	});
}
