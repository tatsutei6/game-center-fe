export default {
    state: {
        isRecord: false,
        aSteps: "",
        bSteps: "",
        recordLoser: "",
        aName: "",
        aPhoto: "",
        bName: "",
        bPhoto: "",
    },
    getters: {
    },
    mutations: {
        updateIsRecord(state, isRecord) {
            state.isRecord = isRecord;
        },
        updateRecordSteps(state, data) {
            state.aSteps = data.aSteps;
            state.bSteps = data.bSteps;
        },
        updateRecordLoser(state, loser) {
            state.recordLoser = loser;
        },
        updateRecordPlayers(state, data) {
            state.aName = data.aName;
            state.aPhoto = data.aPhoto;
            state.bName = data.bName;
            state.bPhoto = data.bPhoto;
        }
    },
    actions: {
    },
    modules: {
    }
}