
class ListViewUtlisClass {

  getExpenseRecordPayloadForEmp(pageNumber, empCode, status) {
    return {
      "department": ["null"],
      "location": ["null"],
      "band": ["null"],
      "designation": ["null"],
      "empCode": String(empCode).toLowerCase(),
      "pageNumber": pageNumber,
      "pageSize": 20,
      "search": "null",
      "status": status
    }
  }

  getExpenseRecordPayloadForSupervisor(pageNumber, empCodes, status) {
    return {
      "department": [
        "null"
      ],
      "location": [
        "null"
      ],
      "band": [
        "null"
      ],
      "designation": [
        "null"
      ],
      "employeeList": empCodes,
      "pageNumber": pageNumber,
      "pageSize": 20,
      "search": "null",
      "status": status,
      "orderType": null
    }
  }

  getRegularizationRecordPayloadForSupervisor(pageNumber, empCodes, status) {
    return {
    "department": [
        "null"
    ],
    "location": [
        "null"
    ],
    "band": [
        "null"
    ],
    "designation": [
        "null"
    ],
    "empCode": empCodes,
    "pageNumber": pageNumber,
    "pageSize": 15,
    "search": "null",
    "status": status,
    "type": [
        10
    ],
    "orderType": null
}
  }

  getLeaveRecordPayloadForSupervisor(pageNumber, empCodes, status){

    return {
      "department": [
          "null"
      ],
      "location": [
          "null"
      ],
      "band": [
          "null"
      ],
      "designation": [
          "null"
      ],
      "empList": empCodes,
      "pageNumber": pageNumber,
      "pageSize": 15,
      "search": "null",
      "leaveName": [
          "null"
      ],
      "status": status,
      "orderType": null
  }
  }

  getShortLeaveRecordPayloadForSupervisor(pageNumber, empCodes, status){

    return {
    "pageNumber": pageNumber,
    "pageSize": 15,
    "orderType": null,
    "search": "null",
    "employeeName": [
        "null"
    ],
    "slDate": [
        "null"
    ],
    "startTime": [
        "null"
    ],
    "endTime": [
        "null"
    ],
    "reason": [
        "null"
    ],
    "status": status
}
  }

}

export const ListViewUtlis = new ListViewUtlisClass()