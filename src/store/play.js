export default {
    state: {
        status: 'matching',  // matching表示匹配界面，playing表示对战界面
        socket: null,
        opponentName: '',
        opponentPhoto: '',
        // 游戏地图Array，1为障碍物或者墙，0为空地
        gameMapArray: [[]],
        aId: 0,
        aName:'',
        aPhoto:'',
        aRow: 0,
        aColumn: 0,
        bId: 0,
        bName:'',
        bPhoto:'',
        bRow: 0,
        bColumn: 0,
        // 游戏地图canvas对象
        gameMapObject: {},
        loser: 'none'  // none、all、A、B
    },
    getters: {},
    mutations: {
        updateSocket(state, socket) {
            state.socket = socket
        },
        updateOpponent(state, opponent) {
            state.opponentName = opponent.opponentName
            state.opponentPhoto = opponent.opponentPhoto
        },
        updateStatus(state, status) {
            state.status = status
        },
        updateGameMapArray(state, gameMapArray) {
            state.gameMapArray = gameMapArray
        },
        updateGameInfo(state, gameInfo) {
            state.gameMapArray = gameInfo.gameMapArray
            state.aId = gameInfo.aId
            state.aName = gameInfo.aName
            state.aPhoto=gameInfo.aPhoto
            state.aRow = gameInfo.aRow
            state.aColumn = gameInfo.aColumn
            state.bId = gameInfo.bId
            state.bName = gameInfo.bName
            state.bPhoto=gameInfo.bPhoto
            state.bRow = gameInfo.bRow
            state.bColumn = gameInfo.bColumn
        },
        updateGameMapObject(state, gameMapObject) {
            state.gameMapObject = gameMapObject
        },
        updateLoser(state, loser) {
            state.loser = loser
        }
    },
    actions: {},
    modules: {}
}