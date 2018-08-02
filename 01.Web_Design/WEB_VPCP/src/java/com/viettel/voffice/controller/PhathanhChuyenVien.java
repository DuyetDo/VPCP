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
public class PhathanhChuyenVien extends SelectorComposer<Component>{
     private static final long serialVersionUID = 1L;
     
    @Listen("onClick = #btn1")
    public void giahan(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/chuyenhancapnhat.zul", null, null);
        window.doModal();
    }
    @Listen("onClick = #btn2")
    public void theodoi(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/giahanxuly.zul", null, null);
        window.doModal();
    }
    @Listen("onClick = #btn3")
    public void theodoichidao(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/giahanxuly.zul", null, null);
        window.doModal();
    }
    @Listen("onClick = #btn4")
    public void dinhkem(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/giahanxuly.zul", null, null);
        window.doModal();
    }
    
}
