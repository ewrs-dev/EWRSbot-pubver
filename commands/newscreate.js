const { SlashCommandBuilder, EmbedBuilder, Client ,Intents, GatewayIntentBits, IntentsBitField } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});


module.exports = {
	data: new SlashCommandBuilder()
		.setName('newscreate')
		.setDescription('コマンドを実行します')
		.addStringOption(option =>
			option.setName('honbun')
				.setDescription('本文')
				.setRequired(true)),
        async execute(interaction) {
            let honbun = interaction.options.getString('honbun');
            console.debug(interaction.option);
            const embed = new EmbedBuilder()
                .setColor(0x46646E)
                .setTitle('ニュース文生成機')
                .setDescription("■ニュース速報■\n" + honbun + "\n情報ソース：NHK")
                .setFooter({
    		        text: "EWRSbot - Public Version",
  	  	        })
  	  	        
  	  	    interaction.reply({ embeds:[embed] });
                
                }};
