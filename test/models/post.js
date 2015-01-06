module.exports = function(APIBuilder) {
	return APIBuilder.Model.extend('post', {
		fields: {
			title: { type: String },
			content: { type: String },
			author_id: { type: Number },
			attachment_id: { type: String }
		},
		connector: 'appc.mongo',

		metadata: {
			'appc.mongo': {
				table: 'Composite_Post'
			}
		}
	});
};