package ie.emeraldjava.gitid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.info.GitProperties;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by pauloconnell on 04/07/17.
 */
@RestController
public class HomeController {

    @Autowired
    private GitProperties gitProperties = null;

    @RequestMapping(value = "/git", method = RequestMethod.GET)
    GitProperties getVersion() {
        return gitProperties;
    }
}
