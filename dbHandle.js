// 데이터베이스 생성 및 열기
function openDB() {
	db = window.openDatabase('kidsDB', '1.0', '유치원DB', 1024 * 1024);
	console.log('1_DB 생성...');
}

// 테이블 생성 트랜잭션 실행
function createTable() {
	db.transaction(function(tr) {
		var createSQL_teacher = 'create table if not exists teachers(teacher_id integer primary key autoincrement, t_id varchar(20) not null unique, t_password varchar(20) not null, t_name varchar(20) not null, t_email varchar(50), t_phone varchar(20), t_ban varchar(20))';
		var createSQL_parent = 'create table if not exists parents(parent_id integer primary key autoincrement, p_id varchar(20) not null unique, p_password varchar(20) not null, p_email varchar(50), p_phone varchar(20), p_kidban varchar(20), p_kidname varchar(20))';
		var createSQL_ban = 'create table if not exists bans(ban_id integer primary key autoincrement, b_name varchar(20) not null unique, b_teacher varchar(20), FOREIGN KEY(b_teacher) REFERENCES teachers(t_id) ON DELETE CASCADE)';
		var createSQL_kid = 'create table if not exists kids(kid_id integer primary key autoincrement, k_ban varchar(20) not null, k_name varchar(20) not null, k_parent varchar(50), FOREIGN KEY(k_ban) REFERENCES bans(b_name) ON DELETE CASCADE, FOREIGN KEY(k_parent) REFERENCES parents(p_id) ON DELETE CASCADE)';
		var createSQL_inout = 'create table if not exists inouts(inout_id integer primary key autoincrement, i_ban varchar(20) not null, i_name varchar(20) not null, i_inout varchar(50), i_time text, FOREIGN KEY(i_ban) REFERENCES bans(b_name) ON DELETE CASCADE)';
		var createSQL_allday = 'create table if not exists alldays(allday_id integer primary key autoincrement, a_ban varchar(20) not null, a_teacher varchar(50), a_title varchar(255), a_content text, FOREIGN KEY(a_ban) REFERENCES bans(b_name) ON DELETE CASCADE), FOREIGN KEY(a_teacher) REFERENCES teachers(t_name) ON DELETE CASCADE)';
		var createSQL_location = 'create table if not exists locations(location_id integer primary key autoincrement, l_ban varchar(20) not null unique, l_teacher varchar(20) not null, l_latitude real, l_longitude real, i_time text, FOREIGN KEY(l_ban) REFERENCES bans(b_name) ON DELETE CASCADE, FOREIGN KEY(l_teacher) REFERENCES teachers(t_name) ON DELETE CASCADE)';

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

		var insertBanSQL1 = 'insert into bans(b_name, b_teacher) values(?,?)';
		var insertBanSQL2 = 'insert into bans(b_name, b_teacher) values(?,?)';
		var insertBanSQL3 = 'insert into bans(b_name, b_teacher) values(?,?)';

		// 아이 정보
		var kidName1 = "철수";
		var kidName2 = "맹구";
		var kidName3 = "훈이";
		var kidName4 = "유리";
		var kidName5 = "짱구";
		var kidBan1 = "풀잎반";
		var kidParent1 = "p1";

		var insertKidSQL1 = 'insert into kids(k_ban, k_name, k_parent) values(?,?,?)';
		var insertKidSQL2 = 'insert into kids(k_ban, k_name, k_parent) values(?,?,?)';
		var insertKidSQL3 = 'insert into kids(k_ban, k_name, k_parent) values(?,?,?)';

		// 반 데이터 저장
		tr.executeSql(insertBanSQL1, [banName1, teacher1], function(tr, rs) {
			console.log('3_1_1_ 풀잎반 정보 등록 성공...');
		}, function() {
			console.log('3_1_1_ 풀잎반 정보 등록 실패...');
		});
		tr.executeSql(insertBanSQL2, [banName2, teacher2], function(tr, rs) {
			console.log('3_1_2_ 꽃잎반 정보 등록 성공...');
		}, function() {
			console.log('3_1_2_ 꽃잎반 정보 등록 실패...');
		});
		tr.executeSql(insertBanSQL3, [banName3, teacher3], function(tr, rs) {
			console.log('3_1_3 _햇살반 정보 등록 성공...');
		}, function() {
			console.log('3_1_3_ 햇살반 정보 등록 실패...');
		});

		// 아이 데이터 저장
		tr.executeSql(insertKidSQL1, [kidName1, kidBan1, kidParent1], function(tr, rs) {
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
		var ban = $('#teacherClass').val();
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
		var email = $('#parentEmail').val();
		var phone = $('#parentPhone').val();
		var kid_name = $('#childName').val();
		var kid_ban = $('#childClass').val();
		var insertSQL1 = 'insert into parents(p_id, p_password, p_email, p_phone, p_kidban, p_kidname) values(?,?,?,?,?,?)';
		tr.executeSql(insertSQL1, [id, password, email, phone, kid_ban, kid_name], function(tr, rs) {
			console.log('3_ 학부모 회원가입 등록...no: ' + rs.insertId);
			// alert('맛집명 ' + $('#teacherId').val() + ' 이(가) 입력되었습니다');
			alert('학부모 ' + $('#childName').val() + ' 학부모님이 회원가입 되었습니다');
			location.href = "main.html";
		}, function() {
			alert('학부모' + $('#childName').val() + ' 학부모님이 회원가입에 실패하였습니다');
		});
	});
}