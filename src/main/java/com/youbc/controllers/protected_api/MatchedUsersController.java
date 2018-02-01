package com.youbc.controllers.protected_api;

import com.youbc.database.MatchedUsersDAO;
import com.youbc.database.ProfileDAO;
import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import com.youbc.models.MatchedUser;
import com.youbc.models.profile.UserProfile;
import com.youbc.securities.services.CookieService;
import com.youbc.utilities.Endpoints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Set;
import java.util.TreeSet;

@RestController
public class MatchedUsersController {

    private CookieService cookieService;
    private MatchedUsersDAO matchedUsersDAO;
    private ProfileDAO profileDAO;

    @Autowired
    public MatchedUsersController(
            CookieService cookieService,
            MatchedUsersDAO matchedUsersDAO,
            ProfileDAO profileDAO
    ) {
        this.cookieService = cookieService;
        this.matchedUsersDAO = matchedUsersDAO;
        this.profileDAO = profileDAO;
    }

    @RequestMapping(path = Endpoints.MATCHED_USERS, method = RequestMethod.GET)
    public Set<MatchedUser> getAllMatchedUsers(HttpServletRequest request) {
        Set<MatchedUser> response = new TreeSet<>();
        String userId = cookieService.getAuthenticatedUserId(request);
        Set<String> matchedUsers = matchedUsersDAO.fetchAllMatchedUsers(userId);

        for(String theOther : matchedUsers) {
            UserProfile userProfile = profileDAO.fetchUserProfile(theOther)
                    .orElseThrow(() -> new YouBCException(new YouBCError(HttpStatus.NOT_FOUND, "no user found", "no user found")));
            response.add(new MatchedUser(
                    userProfile.getAvatarUrl(),
                    userProfile.getUsername(),
                    userProfile.getWeChatId(),
                    matchedUsersDAO.getLatestLikeTime(userId, theOther),
                    matchedUsersDAO.matchedAtClassmates(userId, theOther),
                    matchedUsersDAO.matchedAtFriends(userId, theOther),
                    matchedUsersDAO.matchedAtRoommates(userId, theOther)
            ));
        }

        return response;
    }
}
