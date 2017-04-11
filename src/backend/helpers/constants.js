const ROLE_ADMIN = 'ADMIN'//Priority 3
const ROLE_MODERATOR = 'MODERATOR'//Priority 2
const ROLE_USER = 'USER'//Priority 1

const getPriority = function(role){
    switch(role){
        case ROLE_ADMIN:
            return 3;
        case ROLE_MODERATOR:
            return 2;
        case ROLE_USER:
            return 1;
        default:
            return 1;
    }
}

module.exports = {
    ROLE_ADMIN : ROLE_ADMIN,
    ROLE_MODERATOR : ROLE_MODERATOR,
    ROLE_USER : ROLE_USER,
    getPriority : getPriority
}