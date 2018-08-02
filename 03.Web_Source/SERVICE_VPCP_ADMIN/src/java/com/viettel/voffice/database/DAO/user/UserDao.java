/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.database.DAO.user;

import com.viettel.voffice.database.entity.admin.UserInfoEntity;
import com.viettel.voffice.library.basecore.database.CoreFuncDataBaseDAO;
import com.viettel.voffice.library.basecore.entity.CoreCommonEntity;
import com.viettel.voffice.library.basecore.entity.CoreUserEntity;
import com.viettel.voffice.library.basecore.security.CoreFuncSecurity;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author nguyendat
 */
public class UserDao {
    /**
     * kiem tra du lieu login he thong
     * @param userName
     * @param passWord
     * @return 
     */
    public  UserInfoEntity getDataLogin(String userName,String passWord){
//        StringBuilder sqlBuilder = new StringBuilder();
//        sqlBuilder.append(" select us.user_id userId,us.user_name userName,us.full_name fullName,");
//        sqlBuilder.append(" dt.dept_id,dt.dept_name  ,us.gender ,us.pos_id,");
//        sqlBuilder.append(" us.pos_name,us.email, us.telephone,us.password passWord,");
//        sqlBuilder.append(" us.staff_code,us.ip, us.status,us.birthday,");
//        sqlBuilder.append(" us.idnumber,us.ca_number,us.token_serial_number,");
//        sqlBuilder.append(" us.sign_attach_id, us.interested_depts,");
//        sqlBuilder.append(" us.interested_depts_set_deadline,  us.salt,");
//        sqlBuilder.append(" us.expiration_date,us.is_cms  from Users us,");
//        sqlBuilder.append(" Department dt where us.status = 1 ");
//        sqlBuilder.append(" and us.dept_id = dt.dept_id  and lower(us.user_Name) = ?");
//        List<Object> params = new ArrayList<>();
//        params.add(userName);
//        CoreFuncDataBaseDAO repo = new CoreFuncDataBaseDAO();
//        List<CoreUserEntity> lst = (List<CoreUserEntity>) repo.getListRecord(sqlBuilder, params,
//                null, null, CoreUserEntity.class);
//        if(lst != null && lst.size() > 0){
//            //convert passwork ve dang chuan ma hoa trong database
//            String userNameAndPass = userName.toLowerCase() + passWord.toLowerCase();
//            String strPasss = CoreFuncSecurity.encryptSHA256(userNameAndPass, lst.get(0).getSalt());
//            if(strPasss.equals(lst.get(0).getPassWord())){
//                UserInfoEntity userInfoEntity = new UserInfoEntity();
//                CoreCommonEntity coreCommonEntity = new CoreCommonEntity();
//                coreCommonEntity.setUserInfor(lst.get(0));
//                userInfoEntity.setCoreCommonEntity(coreCommonEntity);
//                return userInfoEntity;
//            }else{
//                return null;
//            }
//        }
//        return null;
     UserInfoEntity userInfoEntity = new UserInfoEntity();
    CoreCommonEntity coreCommonEntity = new CoreCommonEntity();
    CoreUserEntity item = new CoreUserEntity();
    item.setUserId(123L);
    item.setUserName(userName);
    item.setPassWord(passWord);
    coreCommonEntity.setUserInfor(item);
    
    userInfoEntity.setCoreCommonEntity(coreCommonEntity);
     //   System.out.println(userInfoEntity);
    return userInfoEntity;

    }
    
    /**
     * kiem tra du lieu login he thong
     * @param userEntity
     * @return 
     */
    public  CoreUserEntity registerMember(CoreUserEntity userEntity){
        
        
        
        return null;
    }
     public static void main(String[] args) {
        UserDao us = new UserDao();
        System.out.println(us.getDataLogin("admin", "123"));
    }
}
