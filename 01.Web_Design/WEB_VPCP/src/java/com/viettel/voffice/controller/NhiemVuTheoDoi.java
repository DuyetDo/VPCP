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
public class NhiemVuTheoDoi extends SelectorComposer<Component>{
     private static final long serialVersionUID = 1L;
     
    @Listen("onClick = #renewal1")
    public void giahan(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/giahanxuly.zul", null, null);
        window.doModal();
    }
    @Listen("onClick = #urge")
    public void dondoc(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/dondocthuchiennhiemvucongviec.zul", null, null);
        window.doModal();
    }
    @Listen("onClick = #transferfollow")
    public void chuyendoitheodoi(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/chuyenchuyenvientheodoi.zul", null, null);
        window.doModal();
    }
     @Listen("onClick = #reply_btn")
    public void tralai(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/tralainhiemvucongviec.zul", null, null);
        window.doModal();
    }
    @Listen("onClick = #detail")
    public void chitiet(Event e) {
        //create a window programmatically and use it as a modal dialog.
        Window window = (Window)Executions.createComponents(
                "/VPCP/content/xemchitietvanbanchidaodieuhanh.zul", null, null);
        window.doModal();
    }
}
