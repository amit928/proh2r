export const quickAccessImagesArr = {

    "ApplyLeave": require(`../images/appLeave.png`),
    "AddExpense": require(`../images/appExp.png`),
    "ApplyRegularization": require(`../images/appReg.png`),
    "ApplySeperation": require(`../images/appSep.png`),
    "TeamLeaves": require(`../images/teamLeavesNew.png`),
    "TeamExpense": require(`../images/teamExpenseNew.png`),
    "TeamRegularization": require(`../images/appReg.png`)

}


export const quickAccessMasterListDict = {
    ApplyLeave: {
        name: "Apply Leave",
        screenKey: "ApplyLeave",
        bgcolor: '#C3F0FF',
        borderColor: '#92E2FF',
        textColor: '#025F80',
        image: "ApplyLeave",
        isPayload: true,
        payload: { refreshList: () => { }, isEdit: '0' },

    },
    AddExpense: {
        name: "Add Expense",
        screenKey: "ProAddExpense",
        bgcolor: '#FFDFC9',
        borderColor: '#FFC5A6',
        textColor: '#624434',
        image: "AddExpense",
        isPayload: false,
        payload: {}
    },
    ApplyRegularization: {
        name: "Apply\nRegularization",
        screenKey: "AttendanceTab",
        bgcolor: '#FFDCDE',
        borderColor: '#FFC5C9',
        textColor: '#F12332',
        image: "ApplyRegularization",
        isPayload: true,
        payload: { "tabIndex": 1, "openApplyReg": true }
    },
    ApplySeperation: {
        name: "Apply\nSeperation",
        screenKey: "ProSeperationTab",
        bgcolor: '#D9FFDA',
        borderColor: '#91F896',
        textColor: '#1D8522',
        image: "ApplySeperation",
        isPayload: true,
        payload: { "tabIndex": 0, "openApplyReg": true }
    },
    TeamLeaves: {
        name: "Team Leaves",
        screenKey: "LeaveTab",
        bgcolor: '#EFE4FF',
        borderColor: '#D9C2F9',
        textColor: '#685C79',
        image: "TeamLeaves",
        isPayload: true,
        payload: { "tabIndex": 4, "openApplyReg": false }
    },
    TeamExpense: {
        name: "Team Expense",
        screenKey: "ProExpenseTab",
        bgcolor: '#FFEFD6',
        borderColor: '#FFD699',
        textColor: '#FFB74D',
        image: "TeamExpense",
        isPayload: true,
        payload: { "tabIndex": 1, "openApplyReg": false }
    },
    TeamRegularization: {
        name: "Team\nRegularization",
        screenKey: "AttendanceTab",
        bgcolor: '#D5FFE1',
        borderColor: '#A9E6BA',
        textColor: '#317F46',
        image: "TeamRegularization",
        isPayload: true,
        payload: { "tabIndex": 2, "openApplyReg": false }
    }
}