/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.action;

import com.viettel.voffice.controller.DemoController;
import com.viettel.voffice.entity.document.Demo;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.zkoss.bind.annotation.BindingParam;
import org.zkoss.bind.annotation.Command;
import org.zkoss.bind.annotation.Init;
import org.zkoss.bind.annotation.NotifyChange;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Wire;
import org.zkoss.zul.Grid;
import org.zkoss.zul.Window;




/**
 *
 * @author Administrator
 */
public class FormMV {
    
    Grid gridst;
    List<Demo> students = new ArrayList<>();
    Demo stuSelected = new Demo();
    DemoController action = new DemoController();
    String userName, passWord, keyword;
    Logger logger = Logger.getLogger(FormMV.class);

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
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

    public List<Demo> getStudents() {
        return students;
    }

    @Init
    public List<Demo> getLstStudents() {

        List<Demo> lst = action.getListDemo();
        students = lst;
        return students;
    }
    public void setStudents(List<Demo> students) {
        this.students = students;
    }

    public Demo getStuSelected() {
        return stuSelected;
    }

    public void setStuSelected(Demo stuSelected) {
        this.stuSelected = stuSelected;
    }
    public static void main(String[] args) {
         FormMV s=new  FormMV();
         System.out.println(s.getStudents());
    }

     
   @Wire
   Window eWindow;
    @Command
    @NotifyChange("students")
    public void detail(@BindingParam("student") Demo student)
    {
       
      FormMV s=new FormMV();
      
      Map<String, Object> arguments = new HashMap<String, Object>();
            arguments.put("stuSelected", action.getDetailDemo(student.getId()));
       
       Window window = (Window)Executions.createComponents("/VPCP/edit.zul", eWindow, arguments);
            window.doModal();

          
		
    }
      @Command
      @NotifyChange("students")
    public void add()
    {
          System.out.println(stuSelected);
        action.addDemo(stuSelected);
        getLstStudents();
        clear();
//        Executions.sendRedirect("/VPCP/formVm.zul");
        
    }

     @Command
    public void submit()
    {
          stuSelected.setUsername(userName);
          stuSelected.setPassword(userName);
        action.addDemo(stuSelected);
      
//        Executions.sendRedirect("/VPCP/formVm.zul");
        
    }
    @Command
    @NotifyChange("students")
    public void search() {
        List<Demo> lst = action.search(keyword);
        logger.debug("hnx lst: "+lst);
        this.students = lst;
    }
    @Command
    @NotifyChange("stuSelected")
    public void edit(@BindingParam("student") Demo item) {
        logger.debug(item);
        this.stuSelected = item;
    }
    @Command
    @NotifyChange("stuSelected")
    public void clear() {
        stuSelected = new Demo();
    }
}
