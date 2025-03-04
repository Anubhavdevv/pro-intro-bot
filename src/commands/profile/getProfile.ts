import {Components} from '../../struct/Components'

export default async function getProfile(interaction, client, guild, dbGuild) {
    if (!dbGuild.profileCommandsChannel) {
        const embed = Components.errorEmbed('This server has diabled the profile feature.')

        return interaction.editReply({ embeds: [embed] })
    }
    let userToFetch = ''
    const user = await interaction.options.get('user')?.value

    userToFetch = user || interaction.user.id

    const userProfile = await client.factory.getUserProfile(userToFetch)
    const discordUser = await guild.fetch(userToFetch)
    const userProfileEmbed = Components.profile(userProfile)

    return interaction.editReply(userProfileEmbed)
}
