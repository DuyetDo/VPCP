/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.entity.admin;

/**
 *
 * @author datnv5
 */
public class SysUserEntity {
    Long userId;
    String userName;
    String passWord;
    String fullName;
    String description;
    Long gender;
    Long DEPT_ID;
    String DEPT_NAME;
    String pos_id;
    String POS_NAME;
    String salt;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getGender() {
        return gender;
    }

    public void setGender(Long gender) {
        this.gender = gender;
    }

    public Long getDEPT_ID() {
        return DEPT_ID;
    }

    public void setDEPT_ID(Long DEPT_ID) {
        this.DEPT_ID = DEPT_ID;
    }

    public String getDEPT_NAME() {
        return DEPT_NAME;
    }

    public void setDEPT_NAME(String DEPT_NAME) {
        this.DEPT_NAME = DEPT_NAME;
    }

    public String getPos_id() {
        return pos_id;
    }

    public void setPos_id(String pos_id) {
        this.pos_id = pos_id;
    }

    public String getPOS_NAME() {
        return POS_NAME;
    }

    public void setPOS_NAME(String POS_NAME) {
        this.POS_NAME = POS_NAME;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }
    
    
}
