module.exports = (state = ["채팅창입니다."], action)=>{

    switch (action.type){
        case 'CHAT':
            return state.concat({socket:action.socket,chat:action.chat});
        break;
        case 'USER_DISCONNECT':
            return state.filter((item)=>{if(item.socket.id != action.socket.id){return item;}});
        break;
        default:
            return state;
        break;
    }

    return state;
}