// 项目所有的增删改语句

module.exports = {
    queryAll: 'SELECT * FROM ??',
    queryByUserId: 'SELECT * FROM ?? WHERE user_id=?',
    delUser: 'DELETE FROM ?? WHERE user_id=?',
    delPets: 'DELETE FROM ?? WHERE pets_id=?',
    //新增权限用户
    addUser: 'INSERT INTO user(user_id,user_name,account,password,role) VALUES(?,?,?,?,?)',
    // 输入关键字查询权限用户
    selectUser: 'select * from user where (user_id=? or user_name=? or account=?) or (role=? or ? is null)',
    // 更新权限信息
    updateAuthority: 'update ?? set user_id=?,user_name=?,account=?,password=?,role=? where user_id=?',

    updatePassword: 'update user set password=? where telephone=?',

    addPets:'INSERT INTO pets_info(pets_id,pet_name,kind,species,color,pet_age,pet_gender,health,pet_character) VALUES(?,?,?,?,?,?,?,?,?)'
};