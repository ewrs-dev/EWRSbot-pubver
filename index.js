const { Client, EmbedBuilder, GatewayIntentBits, channelLink, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, Collection, TextInputComponent } = require('discord.js');
const { token, version, beta, logch } = require('./config/general.json');
const fs = require('node:fs');
const path = require('node:path');

require('date-utils')
const { execOnce } = require('next/dist/shared/lib/utils');
const startup_time = new Date().toFormat("YYYY/MM/DD HH24時MI分SS秒");
const author = "EWRSBot - Public Version"+" "+version;
const readymessage = "StartUptime:" + startup_time + author
const options = {
   intents: [
 GatewayIntentBits.Guilds,
 GatewayIntentBits.GuildMessages,
 GatewayIntentBits.MessageContent
   ]
};
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});


//コマンドで終了
client.on('messageCreate', message => {
    if (message.content === '!exit') {
        message.reply('10秒後に終了します');
        setTimeout(function(){
            client.channels.cache.get(logch).send('EWRSBot - 停止');
            console.log("exit")
            process.exit();
        },10000);
    }
})


client.on('messageCreate', message => {
  if (message.content.startsWith('!ch')) {
    const args = message.content.split(' ');
    const channelid = args[1];
    const content = args.slice(2).join(' '); //
    const channel = client.channels.cache.get(channelid);
    const authorName = message.author.username;
    channel.send(content);
    const embed = new EmbedBuilder()
  		.setAuthor({
    		name: authorName,
 		 })
  		.setTitle("<#" + channelid + ">")
  		.setDescription(content)
  		.setColor("#0047ee")
  		.setFooter({
    		text: "EWRSbot - public version",
  		})
  		.setTimestamp();
	client.channels.cache.get(logch).send({ embeds: [embed] });
 	 }
});
	


client.on('messageCreate', message => {
  if (message.content === "!help") {
	channel.reply("!ch <チャンネルID> <内容>");    
}});

client.login(token)
client.on('ready', () => {
  if (beta) {
    console.log("ベータモード - 起動")
    client.user.setActivity('ベータモード');
  }
  else {
    client.channels.cache.get(logch).send(readymessage)
    console.log("起動。")
    client.user.setActivity('Normalモード');
  }
});

 client.on('guildMemberAdd', member => {
	  console.log(`${member.guild.name} に ${member.displayName} が参加しました`)
 })
 
 client.on('guildMemberRemove', member => {
	  console.log(`${member.guild.name} から ${member.displayName} が退出しました`)
 })

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`${filePath} に必要な "data" か "execute" がありません。`);
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`${interaction.commandName} が見つかりません。`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
	}
});
