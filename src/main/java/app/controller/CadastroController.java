package app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

import app.entity.User;
import app.service.UserServiceImpl;

@Controller
public class CadastroController {

    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(value = "cadastro")
    public String cadastro(Model model) {
        model.addAttribute("cadastro", new User());
        return "cadastro";
    }

    @RequestMapping(value = "salvarCadastro", method = RequestMethod.POST)
    public String salvarCadastro(@Valid @ModelAttribute("cadastro") User user, BindingResult bindingResult, RedirectAttributes redirAttrs) {
        if (!bindingResult.hasErrors()) { // Valida formulário
            if (user.getPassword().equals(user.getPasswordCheck())) { // Verifica se as senhas são iguais		
                if (userService.findByUsername(user.getUsername()) == null) { // Verifica se já existe o usuário
                    // Criptografa a senha
                    userService.encryptPassword(user);
                    user.setRole("USER");
                    userService.saveUser(user);
                    redirAttrs.addFlashAttribute("message", "Usuário cadastrado com sucesso!");
                    return "redirect:/login";
                } else {
                    bindingResult.rejectValue("username", "error.userexists", "Usuário já existente");
                }
            } else {
                bindingResult.rejectValue("passwordCheck", "error.pwdmatch", "Senhas não são iguais");
            }
        }
        return "cadastro";
    }

}
