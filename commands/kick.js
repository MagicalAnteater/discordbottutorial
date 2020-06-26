const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send("You are not allowed to run that command.");

  let member = message.mentions.members.first();
  if (!member) return message.channel.send("Please specify a valid user.");
  if (!member.kickable)
    return message.channel.send("Unable to kick specified user.");

  let reason = args.slice(1).join(" ");
  if (!reason) reason = "No reason provided.";

  await member
    .kick(reason)
    .catch(error =>
      message.channel.send(`Unable to kick user because of: ${error}.`)
    );
  message.channel.send(`Successfully kicked ${member.user.tag}.`);
  return;
};

module.exports.help = {
  name: "kick"
};
