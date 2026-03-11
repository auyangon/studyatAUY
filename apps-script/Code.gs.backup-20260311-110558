var SPREADSHEET_NAME = "portal5.0";

function doGet(e) {
  return handleRequest_(e ? e.parameter : {});
}

function doPost(e) {
  var postBody = {};

  if (e && e.postData && e.postData.contents) {
    var contentType = String(e.postData.type || "").toLowerCase();

    if (contentType.indexOf("application/json") !== -1) {
      postBody = JSON.parse(e.postData.contents || "{}");
    } else {
      postBody = parseFormBody_(e.postData.contents || "");
    }
  }

  var params = Object.assign({}, e ? e.parameter : {}, postBody);
  return handleRequest_(params);
}

function handleRequest_(params) {
  try {
    var action = String(params.action || "").trim();

    if (!action) {
      throw new Error("Missing action.");
    }

    var payload;

    switch (action) {
      case "login":
        payload = login_(params);
        break;
      case "changePassword":
        payload = changePassword_(params);
        break;
      case "getMyData":
        payload = getMyData_(params);
        break;
      case "markRead":
        payload = markRead_(params);
        break;
      case "checkUpdates":
        payload = checkUpdates_(params);
        break;
      default:
        throw new Error("Unsupported action: " + action);
    }

    return jsonResponse_({ success: true, data: payload });
  } catch (error) {
    return jsonResponse_({
      success: false,
      error: error && error.message ? error.message : "Unexpected server error.",
    });
  }
}

function login_(params) {
  var email = normalizeEmail_(params.email);
  var password = String(params.password || "");
  var users = readSheetAsObjects_("Users");
  var matchedUser = users.filter(function (user) {
    return normalizeEmail_(user.email) === email;
  })[0];

  if (!matchedUser || String(matchedUser.password || "") !== password) {
    throw new Error("Invalid email or password.");
  }

  return { email: email };
}

function changePassword_(params) {
  var email = normalizeEmail_(params.email);
  var oldPassword = String(params.oldPassword || "");
  var newPassword = String(params.newPassword || "");

  if (newPassword.length < 6) {
    throw new Error("New password must contain at least 6 characters.");
  }

  var sheet = getSheet_("Users");
  var values = sheet.getDataRange().getValues();
  var headers = values.shift();
  var emailIndex = headers.indexOf("email");
  var passwordIndex = headers.indexOf("password");
  var rowIndex = -1;

  values.some(function (row, index) {
    if (normalizeEmail_(row[emailIndex]) === email) {
      rowIndex = index + 2;
      return true;
    }

    return false;
  });

  if (rowIndex === -1) {
    throw new Error("User account not found.");
  }

  var currentPassword = String(sheet.getRange(rowIndex, passwordIndex + 1).getValue() || "");

  if (currentPassword !== oldPassword) {
    throw new Error("Current password is incorrect.");
  }

  sheet.getRange(rowIndex, passwordIndex + 1).setValue(newPassword);
  return { success: true };
}

function getMyData_(params) {
  var requesterEmail = normalizeEmail_(params.email);
  var spreadsheet = getSpreadsheet_();
  var users = readSheetAsObjects_("Users");
  var students = readSheetAsObjects_("Students");
  var courses = readSheetAsObjects_("Courses");
  var enrollments = readSheetAsObjects_("Enrollments");
  var attendanceSummary = readSheetAsObjects_("AttendanceSummary");
  var announcements = readSheetAsObjects_("Announcements");
  var notifications = readSheetAsObjects_("StudentNotifications");
  var config = readConfigMap_();
  var deadlines = readSheetAsObjects_("Deadlines");

  ensureKnownUser_(users, requesterEmail);

  var requesterStudent = findStudentByEmail_(students, requesterEmail);
  var canViewAllStudents = isAdminUser_(requesterEmail, requesterStudent);
  var targetEmail = canViewAllStudents ? normalizeEmail_(params.studentEmail || requesterEmail) : requesterEmail;
  var targetStudent = findStudentByEmail_(students, targetEmail);

  if (!targetStudent) {
    targetStudent = students[0];
  }

  if (!targetStudent) {
    throw new Error("No student records were found in the Students sheet.");
  }

  var courseMap = indexBy_(courses, "courseCode");
  var studentEnrollments = enrollments.filter(function (enrollment) {
    return String(enrollment.studentId || "") === String(targetStudent.studentId || "");
  });
  var semesterInfo = inferSemester_(studentEnrollments);
  var semesterWeek = toNumber_(config.semesterWeek, 8);
  var semesterWeeksTotal = toNumber_(config.semesterWeeksTotal, 16);
  var semesterProgress = clamp_(Math.round((semesterWeek / Math.max(semesterWeeksTotal, 1)) * 100), 0, 100);
  var activeEnrollments = semesterInfo.currentSemester
    ? studentEnrollments.filter(function (enrollment) {
        return String(enrollment.semester || "") === semesterInfo.currentSemester;
      })
    : studentEnrollments;
  var attendanceForStudent = attendanceSummary.filter(function (record) {
    return String(record.studentId || "") === String(targetStudent.studentId || "");
  });
  var notificationMap = {};

  notifications.forEach(function (notification) {
    var matchesStudent = String(notification.studentId || "") === String(targetStudent.studentId || "");
    var matchesEmail = normalizeEmail_(notification.email) === normalizeEmail_(targetStudent.email);

    if (matchesStudent || matchesEmail) {
      notificationMap[String(notification.announcementId)] = asBoolean_(notification.read);
    }
  });

  var courseRecords = activeEnrollments.map(function (enrollment) {
    var course = courseMap[String(enrollment.courseId || enrollment.courseCode || "")] || {};
    var attendanceRecord = attendanceForStudent.filter(function (record) {
      return String(record.courseId || "") === String(enrollment.courseId || enrollment.courseCode || "");
    })[0];

    return {
      code: String(course.courseCode || enrollment.courseId || ""),
      name: String(course.courseName || "Course"),
      teacher: String(course.teacher || "Teacher"),
      grade: String(enrollment.grade || "In Progress"),
      progress: semesterProgress,
      attendance: roundToTwo_(toNumber_(attendanceRecord ? attendanceRecord.percentage : 0, 0) * 100),
      googleClassroomLink: String(course.googleClassroomLink || ""),
    };
  });

  var attendanceTotals = attendanceForStudent.reduce(
    function (totals, record) {
      totals.present += toNumber_(record.present, 0);
      totals.late += toNumber_(record.late, 0);
      totals.absent += toNumber_(record.absent, 0);
      return totals;
    },
    { present: 0, late: 0, absent: 0 },
  );

  var attendanceByCourse = attendanceForStudent.map(function (record) {
    return {
      code: String(record.courseId || ""),
      present: toNumber_(record.present, 0),
      late: toNumber_(record.late, 0),
      absent: toNumber_(record.absent, 0),
      percentage: roundToTwo_(toNumber_(record.percentage, 0) * 100),
    };
  });

  var announcementRecords = announcements
    .slice()
    .sort(function (left, right) {
      return new Date(right.date).getTime() - new Date(left.date).getTime();
    })
    .map(function (announcement) {
      return {
        id: String(announcement.id),
        title: String(announcement.title || "Announcement"),
        content: String(announcement.content || ""),
        priority: String(announcement.priority || "LOW"),
        author: String(announcement.author || "AUY"),
        date: String(announcement.date || ""),
        read: Boolean(notificationMap[String(announcement.id)]),
      };
    });

  var enrolledCourseCodes = indexSet_(courseRecords.map(function (course) {
    return course.code;
  }));

  var deadlineRecords = deadlines
    .filter(function (deadline) {
      return !deadline.course || enrolledCourseCodes[String(deadline.course)];
    })
    .map(function (deadline) {
      var daysLeft = daysUntil_(deadline.dueDate);
      return {
        id: String(deadline.id || ""),
        icon: String(deadline.icon || "📝"),
        title: String(deadline.title || "Deadline"),
        course: String(deadline.course || "AUY"),
        dueDate: String(deadline.dueDate || ""),
        daysLeft: daysLeft,
        progress: clamp_(100 - daysLeft * 6, 10, 100),
      };
    })
    .sort(function (left, right) {
      return left.daysLeft - right.daysLeft;
    });

  var creditsEnrolled = activeEnrollments.reduce(function (sum, enrollment) {
    var course = courseMap[String(enrollment.courseId || enrollment.courseCode || "")] || {};
    return sum + toNumber_(course.credits, 0);
  }, 0);
  var gpa = calculateGpa_(studentEnrollments, courseMap);
  var studentList = students.map(function (student) {
    return {
      id: String(student.studentId || ""),
      name: String(student.studentName || "Student"),
      email: String(student.email || ""),
    };
  });
  var unreadAnnouncements = announcementRecords.filter(function (announcement) {
    return !announcement.read;
  }).length;

  return {
    studentId: String(targetStudent.studentId || ""),
    fullName: String(targetStudent.studentName || "Student"),
    firstName: String(targetStudent.studentName || "Student").split(" ")[0],
    email: String(targetStudent.email || ""),
    major: String(targetStudent.major || "Undeclared"),
    studyMode: String(targetStudent.studyMode || "OnCampus"),
    status: String(targetStudent.status || "Active"),
    enrolledCoursesCount: courseRecords.length,
    completedCourses: Math.max(studentEnrollments.length - activeEnrollments.length, 0),
    activeCourses: activeEnrollments.length,
    creditsEnrolled: creditsEnrolled,
    gpa: gpa,
    attendance: attendanceTotals,
    attendanceByCourse: attendanceByCourse,
    courses: courseRecords,
    announcements: announcementRecords,
    deadlines: deadlineRecords,
    students: studentList,
    unreadAnnouncements: unreadAnnouncements,
    daysUntilFinals: toNumber_(config.daysUntilFinals, 0),
    semesterWeek: semesterWeek,
    semesterWeeksTotal: semesterWeeksTotal,
    canViewAllStudents: canViewAllStudents,
    lastUpdatedAt: getLastUpdatedTimestamp_(spreadsheet),
  };
}

function markRead_(params) {
  var requesterEmail = normalizeEmail_(params.email);
  var announcementId = String(params.announcementId || "");
  var users = readSheetAsObjects_("Users");
  var students = readSheetAsObjects_("Students");
  var requesterStudent = findStudentByEmail_(students, requesterEmail);
  var canViewAllStudents = isAdminUser_(requesterEmail, requesterStudent);
  var targetEmail = canViewAllStudents ? normalizeEmail_(params.studentEmail || requesterEmail) : requesterEmail;
  var targetStudent = findStudentByEmail_(students, targetEmail);

  ensureKnownUser_(users, requesterEmail);

  if (!targetStudent) {
    throw new Error("Student record not found.");
  }

  var sheet = getSheet_("StudentNotifications");
  var values = sheet.getDataRange().getValues();
  var headers = values.shift();
  var studentIdIndex = headers.indexOf("studentId");
  var emailIndex = headers.indexOf("email");
  var announcementIdIndex = headers.indexOf("announcementId");
  var readIndex = headers.indexOf("read");
  var readAtIndex = headers.indexOf("readAt");
  var rowToUpdate = -1;

  values.some(function (row, index) {
    var sameStudent = String(row[studentIdIndex] || "") === String(targetStudent.studentId || "");
    var sameEmail = normalizeEmail_(row[emailIndex]) === normalizeEmail_(targetStudent.email);
    var sameAnnouncement = String(row[announcementIdIndex] || "") === announcementId;

    if ((sameStudent || sameEmail) && sameAnnouncement) {
      rowToUpdate = index + 2;
      return true;
    }

    return false;
  });

  if (rowToUpdate === -1) {
    sheet.appendRow([targetStudent.studentId, targetStudent.email, announcementId, true, new Date()]);
  } else {
    sheet.getRange(rowToUpdate, readIndex + 1).setValue(true);
    sheet.getRange(rowToUpdate, readAtIndex + 1).setValue(new Date());
  }

  return { success: true };
}

function checkUpdates_(params) {
  var lastSync = toNumber_(params.lastSync, 0);
  var timestamp = getLastUpdatedTimestamp_(getSpreadsheet_());

  return {
    needsUpdate: timestamp > lastSync,
    timestamp: timestamp,
  };
}

function getSpreadsheet_() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (activeSpreadsheet) {
    return activeSpreadsheet;
  }

  var files = DriveApp.getFilesByName(SPREADSHEET_NAME);

  if (!files.hasNext()) {
    throw new Error("Spreadsheet named '" + SPREADSHEET_NAME + "' was not found.");
  }

  return SpreadsheetApp.open(files.next());
}

function getSheet_(sheetName) {
  var sheet = getSpreadsheet_().getSheetByName(sheetName);

  if (!sheet) {
    throw new Error("Missing required sheet: " + sheetName);
  }

  return sheet;
}

function readSheetAsObjects_(sheetName) {
  var sheet = getSheet_(sheetName);
  var values = sheet.getDataRange().getValues();

  if (values.length === 0) {
    return [];
  }

  var headers = values.shift();

  return values
    .filter(function (row) {
      return row.some(function (cell) {
        return String(cell || "") !== "";
      });
    })
    .map(function (row) {
      var record = {};

      headers.forEach(function (header, index) {
        record[String(header)] = row[index];
      });

      return record;
    });
}

function readConfigMap_() {
  var configRows = readSheetAsObjects_("Config");
  var config = {};

  configRows.forEach(function (row) {
    config[String(row.key)] = row.value;
  });

  return config;
}

function parseFormBody_(body) {
  var params = {};

  body.split("&").forEach(function (pair) {
    if (!pair) {
      return;
    }

    var pieces = pair.split("=");
    var key = decodeURIComponent(pieces[0] || "").replace(/\+/g, " ");
    var value = decodeURIComponent(pieces.slice(1).join("=") || "").replace(/\+/g, " ");
    params[key] = value;
  });

  return params;
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function normalizeEmail_(value) {
  return String(value || "").trim().toLowerCase();
}

function ensureKnownUser_(users, email) {
  var exists = users.some(function (user) {
    return normalizeEmail_(user.email) === email;
  });

  if (!exists) {
    throw new Error("User account not found.");
  }
}

function findStudentByEmail_(students, email) {
  return students.filter(function (student) {
    return normalizeEmail_(student.email) === normalizeEmail_(email);
  })[0];
}

function isAdminUser_(email, requesterStudent) {
  if (!requesterStudent) {
    return true;
  }

  return email.indexOf("teacher") !== -1 || email.indexOf("admin") !== -1;
}

function indexBy_(rows, key) {
  return rows.reduce(function (map, row) {
    map[String(row[key] || "")] = row;
    return map;
  }, {});
}

function indexSet_(values) {
  return values.reduce(function (set, value) {
    set[String(value)] = true;
    return set;
  }, {});
}

function inferSemester_(enrollments) {
  var counts = {};

  enrollments.forEach(function (enrollment) {
    var semester = String(enrollment.semester || "");

    if (!semester) {
      return;
    }

    counts[semester] = (counts[semester] || 0) + 1;
  });

  var entries = Object.keys(counts).sort(function (left, right) {
    return counts[right] - counts[left];
  });

  return {
    currentSemester: entries[0] || "",
  };
}

function calculateGpa_(enrollments, courseMap) {
  var gradePoints = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    D: 1.0,
    F: 0.0,
  };
  var totals = enrollments.reduce(
    function (summary, enrollment) {
      var grade = String(enrollment.grade || "").toUpperCase();
      var points = gradePoints[grade];

      if (points === undefined) {
        return summary;
      }

      var course = courseMap[String(enrollment.courseId || enrollment.courseCode || "")] || {};
      var credits = toNumber_(course.credits, 3);
      summary.points += points * credits;
      summary.credits += credits;
      return summary;
    },
    { points: 0, credits: 0 },
  );

  if (!totals.credits) {
    return 0;
  }

  return roundToTwo_(totals.points / totals.credits);
}

function getLastUpdatedTimestamp_(spreadsheet) {
  return DriveApp.getFileById(spreadsheet.getId()).getLastUpdated().getTime();
}

function toNumber_(value, fallback) {
  var number = Number(value);
  return isNaN(number) ? fallback : number;
}

function roundToTwo_(value) {
  return Math.round(value * 100) / 100;
}

function clamp_(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function asBoolean_(value) {
  if (typeof value === "boolean") {
    return value;
  }

  var normalized = String(value || "").toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

function daysUntil_(value) {
  var dueDate = new Date(value);

  if (isNaN(dueDate.getTime())) {
    return 0;
  }

  return Math.max(0, Math.ceil((dueDate.getTime() - new Date().getTime()) / 86400000));
}