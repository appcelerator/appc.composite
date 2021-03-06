module.exports = function (Arrow) {
	return Arrow.Model.extend('article', {
		fields: {
			title: { type: String, model: 'post' },
			content: { type: String, model: 'post' },
			author_id: { type: Number, model: 'post' },
			author_first_name: { type: String, name: 'first_name', required: false, model: 'user' },
			author_last_name: { type: String, name: 'last_name', required: false, model: 'user' },
			attachment_id: { type: String, model: 'post' },
			attachment_content: { type: String, name: 'attachment_content', required: false, model: 'attachment' }
		},
		connector: 'appc.composite',

		metadata: {
			'appc.composite': {
				left_join: [
					{
						model: 'user',
						join_properties: {
							id: 'author_id'
						}
					},
					{
						model: 'attachment',
						join_properties: {
							id: 'attachment_id'
						}
					}
				]
			}
		}
	});
};