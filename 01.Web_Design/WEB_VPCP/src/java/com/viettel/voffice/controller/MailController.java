/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.controller;

import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.event.Event;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Listen;
import org.zkoss.zul.Window;

/**
 *
 * @author Administrator
 */
public class MailController extends SelectorComposer<Component>{
     private static final long serialVersionUID = 1L;
     
    @Listen("onClick = #btn1,#btn2,#btn3")
    public void dichchuyen(Event e) {
        //create a window programmatically and use it as a modal dialog.
       Executions.sendRedirect("/QLT/content/detailEmail.zul");
    }
    @Listen("onClick = #refresh")
    public void refresh(Event e) {
        
    }
     @Listen("onClick = #compose")
    public void compose(Event e) {
         Executions.sendRedirect("/QLT/content/soanthu.zul");
    }
     @Listen("onClick = #reply")
    public void reply(Event e) {
        Executions.sendRedirect("/QLT/content/soanthu.zul");
    }
     @Listen("onClick = #replyall")
    public void replyall(Event e) {
        Executions.sendRedirect("/QLT/content/soanthu.zul");
    }
     @Listen("onClick = #forward")
    public void forward(Event e) {
        Executions.sendRedirect("/QLT/content/soanthu.zul");
    }
     
    
}
