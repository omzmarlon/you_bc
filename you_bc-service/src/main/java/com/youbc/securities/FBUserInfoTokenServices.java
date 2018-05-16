package com.youbc.securities;

import com.youbc.database.UserProfileDAO;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.common.exceptions.InvalidTokenException;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

import java.util.Map;

public class FBUserInfoTokenServices extends UserInfoTokenServices {

    private UserProfileDAO userProfileDAO;

    public FBUserInfoTokenServices(String userInfoEndpointUrl, String clientId, UserProfileDAO userProfileDAO) {
        super(userInfoEndpointUrl, clientId);
        this.userProfileDAO = userProfileDAO;
    }

    @Override
    public OAuth2Authentication loadAuthentication(String accessToken)
            throws AuthenticationException, InvalidTokenException {
        OAuth2Authentication authentication = super.loadAuthentication(accessToken);

        Map<String, String> userDetails = (Map<String, String>) authentication.getUserAuthentication().getDetails();
        String username = userDetails.get("name");

        // TODO: organize how to save to db
        if (!userProfileDAO.userExistsByUsername(username+"_fb")) {
            // TODO: what to do with gender?
            userProfileDAO.createNewFormLoginUser(username+"_fb", null, "1");
        }

        return authentication;
    }

}
