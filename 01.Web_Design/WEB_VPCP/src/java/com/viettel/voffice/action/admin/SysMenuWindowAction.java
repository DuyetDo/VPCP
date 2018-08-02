/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.action.admin;

import org.zkoss.bind.annotation.Init;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.select.SelectorComposer;

/**
 * Mo chi tiet khung windows
 * @author datnv5
 */
public class SysMenuWindowAction  extends SelectorComposer<Component> {
    @Init
    public void init() {
        String aa = (String) Executions.getCurrent().getArg().get("myMap");
    }
}
