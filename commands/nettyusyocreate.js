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
		.setName('nettyusyocreate')
		.setDescription('コマンドを実行します')
		.addStringOption(option =>
			option.setName('taisyotiiki')
				.setDescription('対象地域')
				.setRequired(true)),
        async execute(interaction) {
            let taisyotiiki = interaction.options.getString('taisyotiiki');
            console.debug(interaction.option);
            const embed = new EmbedBuilder()
                .setColor(0x46646E)
                .setTitle('熱中症警戒アラート文作成機')
                .setDescription("■熱中症警戒アラート■\n" + "以下の地域では熱中症警戒アラートが発表されています。\n" + "特に対象地域では警戒を強めてください\n" + "対象地域:" + taisyotiiki + "\n水分・塩分補給を怠らず、喉が渇いていなくても水分補給を行いましょう。" + "\n情報データ：気象庁")
                .setFooter({
    		        text: "EWRSbot - Public Version",
  	  	        })
  	  	        
  	  	    interaction.reply({ embeds:[embed] });
                
                }};
