package com.youbc.controllers.protected_api;

import com.youbc.database.ProfileDAO;
import com.youbc.exceptions.YouBCError;
import com.youbc.exceptions.YouBCException;
import com.youbc.models.profile.ClassmatesProfile;
import com.youbc.models.profile.FriendsProfile;
import com.youbc.models.profile.RoommatesProfile;
import com.youbc.models.profile.UserProfile;
import com.youbc.securities.services.CookieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Set;

@RestController
public class ProfileController {

    private ProfileDAO profileDAO;
    private CookieService cookieService;

    @Autowired
    public ProfileController(ProfileDAO profileDAO, CookieService cookieService) {
        this.profileDAO = profileDAO;
        this.cookieService = cookieService;
    }

    @RequestMapping(path = "/api/profile/classmates", method = RequestMethod.GET)
    public ClassmatesProfile getClassmatesProfile(HttpServletRequest request) {
        return profileDAO.
                fetchClassmatesProfile(cookieService.getAuthenticatedUserId(request))
                .orElseThrow(
                        () -> new YouBCException(
                                new YouBCError(HttpStatus.NOT_FOUND, "Not Found", "Classmates Profile Not Found")
                        )
                );
    }

    @RequestMapping(path = "/api/profile/roommates", method = RequestMethod.GET)
    public RoommatesProfile getRoommatesProfile(HttpServletRequest request) {
        return profileDAO.
                fetchRoommatesProfile(cookieService.getAuthenticatedUserId(request))
                .orElseThrow(
                        () -> new YouBCException(
                                new YouBCError(HttpStatus.NOT_FOUND, "Not Found", "Roommates Profile Not Found")
                        )
                );
    }

    @RequestMapping(path = "/api/profile/friends", method = RequestMethod.GET)
    public FriendsProfile getFriendsProfile(HttpServletRequest request) {
        return profileDAO.
                fetchFriendsProfile(cookieService.getAuthenticatedUserId(request))
                .orElseThrow(
                        () -> new YouBCException(
                                new YouBCError(HttpStatus.NOT_FOUND, "Not Found", "Friends Profile Not Found")
                        )
                );
    }

    @RequestMapping(path = "/api/profile/user", method = RequestMethod.GET)
    public UserProfile getUserProfile(HttpServletRequest request) {
        return profileDAO
                .fetchUserProfile(cookieService.getAuthenticatedUserId(request))
                .orElseThrow(
                        () -> new YouBCException(
                                new YouBCError(HttpStatus.NOT_FOUND, "Not Found", "User Profile Not Found")
                        )
                );
    }

    @RequestMapping(path = "/api/profile/user", method = RequestMethod.PUT)
    public Integer updateUserProfile(HttpServletRequest request, @RequestBody UserProfile userProfile) {
        Integer userID = cookieService.getAuthenticatedUserId(request);
        profileDAO.fillPersonalProfile(
                userID,
                userProfile.getUsername(),
                userProfile.getAge(),
                userProfile.getSex(),
                userProfile.getHoroscope()
        );
        return userID;
    }

    @RequestMapping(path = "/api/profile/avatar", method = RequestMethod.PUT, consumes = "text/plain")
    public Integer updateAvatarUrl(HttpServletRequest request, @RequestBody String avatarUrl) {
        Integer userID = cookieService.getAuthenticatedUserId(request);
        profileDAO.updateProfileImageUrl(userID, avatarUrl);
        return userID;
    }

    @RequestMapping(path = "/api/profile/wechatId", method = RequestMethod.PUT, consumes = "text/plain")
    public Integer updateWechatId(HttpServletRequest request, @RequestBody String wechatId) {
        Integer userID = cookieService.getAuthenticatedUserId(request);
        profileDAO.updateWechatId(userID, wechatId);
        return userID;
    }

    @RequestMapping(path = "/api/profile/friends", method = RequestMethod.PUT)
    public Integer  updateFriendsProfile(
            HttpServletRequest request, @RequestBody FriendsProfile friendsProfile
    ) {
        Integer userID = cookieService.getAuthenticatedUserId(request);
        profileDAO.fillFriendsProfile(
                userID,
                friendsProfile.getFaculty(),
                friendsProfile.getRelationship(),
                friendsProfile.getMotto(),
                friendsProfile.getTags()
        );
        return userID;
    }

    @RequestMapping(path = "/api/profile/roommates", method = RequestMethod.PUT)
    public Integer  updateRoommatesProfile(
            HttpServletRequest request, @RequestBody RoommatesProfile roommatesProfile
    ) {
        Integer userID = cookieService.getAuthenticatedUserId(request);
        profileDAO.fillRoommatesProfile(
                userID,
                roommatesProfile.getLocation(),
                roommatesProfile.getHometown(),
                roommatesProfile.getMotto(),
                roommatesProfile.getTags()
        );
        return userID;
    }

    @RequestMapping(path = "/api/profile/classmates", method = RequestMethod.PUT)
    public Integer updateClassmatesProfile(
            HttpServletRequest request, @RequestBody ClassmatesProfile classmatesProfile
    ) {
        Integer userID = cookieService.getAuthenticatedUserId(request);
        profileDAO.fillClassmatesProfile(
                userID,
                classmatesProfile.getMajor(),
                classmatesProfile.getCourses(),
                classmatesProfile.getMotto(),
                classmatesProfile.getTags()
        );
        return userID;
    }

    @RequestMapping(path = "/api/profile/majors", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody Set<String> getMajors() {
        return profileDAO.getMajors();
    }

    @RequestMapping(path = "/api/profile/courses", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public Set<String> getCourses(@RequestParam("filter") String filter) {
        return  profileDAO.getCourses(filter);
    }

    @RequestMapping(path = "/api/profile/classmatesTags", method = RequestMethod.GET)
    public Set<String> getClassmatesTags() {
        return profileDAO.getClassmatesTags();
    }

    @RequestMapping(path = "/api/profile/locations", method = RequestMethod.GET)
    public Set<String> getLocations() {
        return profileDAO.getLocations();
    }

    @RequestMapping(path = "/api/profile/hometowns", method = RequestMethod.GET)
    public Set<String> getHometowns() {
        return profileDAO.getHometowns();
    }

    @RequestMapping(path = "/api/profile/roommatesTags", method = RequestMethod.GET)
    public Set<String> getRoommatesTags() {
        return profileDAO.getRoommatesTags();
    }

    @RequestMapping(path = "/api/profile/faculties", method = RequestMethod.GET)
    public Set<String> getFaculties() {
        return profileDAO.getFaculties();
    }

    @RequestMapping(path = "/api/profile/relationshipStatuses", method = RequestMethod.GET)
    public Set<String> getRelationshipStatuses() {
        return profileDAO.getRelationshipStatuses();
    }

    @RequestMapping(path = "/api/profile/friendsTags", method = RequestMethod.GET)
    public Set<String> getFriendsTags() {
        return profileDAO.getFriendsTags();
    }

}
