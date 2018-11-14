package app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @RequestMapping("/")
    String index() {
        return "index";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }
    
    @RequestMapping("/clientes")
    String clientes(ModelMap modal) {
        return "clientes";
    }
    
    @RequestMapping("/usuarios")
    String usuarios(ModelMap modal) {
        return "usuarios";
    }

    @RequestMapping("/partials/{page}")
    String partialHandler(@PathVariable("page") final String page) {
        return page;
    }

}
