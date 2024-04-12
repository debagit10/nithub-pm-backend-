const Meeting = require("../models/meetingModel");

const addMeeting = async (req, res) => {
  const { team_id, title, day, time, status } = req.body;

  const meetingExists = await Meeting.findOne({
    team_id: team_id,
    day: day,
    time: time,
  });

  if (meetingExists) {
    res.json({ error: "A meeting has been schduled for this time" });
    return;
  }

  try {
    const meeting = await Meeting.create({
      team_id: team_id,
      title: title,
      day: day,
      time: time,
      status: status,
    });

    if (meeting) {
      meeting.save();
      res.json({
        success: "meeting schedlued successfully",
      });
    } else {
      res.json({ error: "failed to schedule meeting" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getMeeting = async (req, res) => {
  const { team_id } = req.query;

  try {
    const meeting = await Meeting.find({ team_id: team_id });
    if (meeting) {
      res.json(meeting);
    } else {
      res.json({ error: "There are currently no scheduled meeting" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addMeeting, getMeeting };
