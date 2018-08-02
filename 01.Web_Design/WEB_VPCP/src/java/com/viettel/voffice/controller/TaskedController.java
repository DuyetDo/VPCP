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
public class TaskedController extends SelectorComposer<Component>{
     private static final long serialVersionUID = 1L;
     
    @Listen("onClick = #renewal1,#renewal2,#renewal3")
    public void giahan(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/giahanxuly.zul", null, null);
        window.doModal();
    }
    @Listen("onClick = #edit1,#edit2")
    public void capnhat(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/capnhatnoidungtheodoi.zul", null, null);
        window.doModal();
    }
     @Listen("onClick = #btn3")
    public void delete(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/capnhatnoidungtheodoi.zul", null, null);
        window.doModal();
    }
      @Listen("onClick = #additional")
    public void bosung(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/bosungnhiemvucongviecgiao.zul", null, null);
        window.doModal();
    }
    @Listen("onClick = #reply")
    public void thuhoi(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/thuhoiketluan.zul", null, null);
        window.doModal();
    }
    @Listen("onClick = #detail1")
    public void chitiet1(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/xemchitietvanbanchidaodieuhanh.zul", null, null);
        window.doModal();
    }
    
}
