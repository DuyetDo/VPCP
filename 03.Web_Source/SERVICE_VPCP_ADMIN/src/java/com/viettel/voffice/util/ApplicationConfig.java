/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.util;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author nguyendat
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(com.viettel.voffice.action.AuthenResource.class);
        resources.add(com.viettel.voffice.action.DemoResource.class);
        resources.add(com.viettel.voffice.action.DocumentResource.class);
        resources.add(com.viettel.voffice.action.SysMenuResource.class);
        resources.add(com.viettel.voffice.util.SystemUserResource.class);
    }
    
}
