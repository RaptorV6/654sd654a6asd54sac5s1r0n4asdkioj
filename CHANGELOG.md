## [1.1.0-beta.3](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.1.0-beta.2...v1.1.0-beta.3) (2025-05-27)


### Features

* add ability to log as test user in dev mode ([c38d2a9](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c38d2a983fd9c56408e956e19f5d2ba1c3712d44))
* add calednar helper calculation functions ([8ba41be](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8ba41be9961ff55c5833414ee800c3fafc45d03d))
* add cdr planning ([f9cb2d4](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f9cb2d4952efca4aeb9dcc890e00f15171a13ed6)), closes [#116](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/116)
* add date helpers ([72218bf](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/72218bf8f80ce8be12ee11c72c0717faf931a37a))
* add mock client builder ([d5cc6af](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d5cc6afc4509d769f4a52a1cc2e64657e827aa13))
* add path builder helpers and hooks ([a78503d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/a78503d8fcaf0d5ad5ef15cc5b37672155573bce))
* add redis as dependency ([df6a9fa](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/df6a9fa45dcbde45b032a6322814081e0cf799be))
* add render pdf helpers ([2ed1711](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2ed1711cfd3a2e298746a7b9ae9fa5a62ada9d13))
* add websocket to production server ([3d5853b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/3d5853b260791131bef1ec92687a8b7e3aab80c5))
* auth user ([31c81bd](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/31c81bdac0795b7344fc68ee46c670968d2b97b4))
* create heler to check if user has permission ([c3456d2](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c3456d21e78339abd38c8b31535d8841948e5e3d))
* iris with scalar codes ([bdb5001](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/bdb50017a5bc4735d80682160e051cafa2d7b747))
* rename features to permissions ([7093f14](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/7093f146f3ade367f5ade3e7e96637cd22d79235))
* rename useUserFeatures to useUserGrants ([65a8686](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/65a8686d46d820af7633bf333e56c327dcbf9963))
* rename useUserHasFeature to useUserHasPermission ([2b8b763](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2b8b7630e7db8dfbaba333189a54005da0e1dadd))
* rewrite subscriptions ([d113a68](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d113a6820412081d72625259628e2223616812dc))
* update calendar component ([776bc4f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/776bc4f8279bccffd0f8fce5587acd2fb7fc1bc6)), closes [#116](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/116)
* update iris client schema ([9cbe8b7](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9cbe8b76ac4b4c4662ca9ff67970f1cb974e506a))
* update qwik packages to v1.13.0 ([08d9994](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/08d9994be45dba85e27fc6e089ff7244482d88bd))
* updated base cdr plan preview ([72ffebb](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/72ffebb4d1b5baf4a4a63ef569215cc16900f359))
* useUserHasPermission with better params ([679e145](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/679e145ecb35764ea4f9cf36b09abdc36707f941))


### Bug Fixes

* profile grants serialization ([37796be](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/37796be0e5fd82f09b4bdccf9e7ba4279b9cec59))

## [1.1.0-beta.2](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.1.0-beta.1...v1.1.0-beta.2) (2025-04-15)


### Features

*  account activation detail - icons ([7b4bf11](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/7b4bf1135803cdc66c30d0a7aa7b406ea399e5f6)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - adjust callcenter/salus-requests/index ([89ddec1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/89ddec100a9daffceb9a0bb3e5a018db3f3ee9bd)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - adjust index ([046c3ad](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/046c3ad0477af99855fe5c56ec393c3f92578d71)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - adjust mockRequests ([21e3090](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/21e3090a49c92cea0e6dd96f520261c4ee660a0c)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - adjust request list ([bc40677](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/bc40677c0f028dd368f1102f8c942b4012644caa)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - adjust request-card ([72a18cb](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/72a18cb9e48e0c8f1f65c9ddfc4b6567849c0e51)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - adjust RequestList ([15f7645](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/15f7645358f13f416abfde38fee0c1db2b64b7f7)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - adjust types ([b91b60b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b91b60b01c201487c2fe4fa665ce9cc0864f5fbc)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - CopySpan ([dce2c57](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/dce2c57911c4ddf19d80054a2b21003bfd07a747)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - create RequestListItem ([abf4b9c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/abf4b9c74d336ae5309445c77cd3c216a0a79d3d)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - IconWithTitle ([860d1e5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/860d1e58c6261acd1247e06d6ad3a8316d9d2f2d)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - mockRequests ([aad215c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/aad215c1a420e0e4db3be7126b39d798bff564cd)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - Obcanka templates for display ([20b3d0e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/20b3d0eb10344183424cc750851a90a93b2f7f6d)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - PatientInfo ([f855d68](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f855d682ff73d8c24a70acee3e0f8bb2b8b9836f)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - rename RequestCard ([70ddf40](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/70ddf40f6f5534109ce24d6696f28f4ac128db49)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - requestDetailMap ([71d3c62](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/71d3c621550d046a5cbe71e45ba8a50348f06ef6)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - RequestListItemDetail ([cbd582b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cbd582be68a80cf7575b089b6bd4afc79919d4a6)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - RequestListItemHeader ([9b4e920](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9b4e920d8848557e34168c6d14c6e60e26aaaab1)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail - RequestListItemHeaderAction ([245f68c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/245f68c8e096fc1ed8db56241ef4368c66c3a73b)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detail-adjust NewAccountRequestListItemDetail ([e1eb205](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/e1eb2051bd1b183f097c2c1247e09cea097ed8af)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* account activation detal - NewAccountRequestListItemDetail ([be7cfab](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/be7cfabef0c80128082bc95102fc26282778fa4d)), closes [#102](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/102)
* list of requests - create /callcenter/salus-requests ([960761e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/960761ecfb3dd6e0446f43138e03ccb0eed693e1)), closes [#101](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/101)
* list of requests - icons ([2187a7f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2187a7fd21226c8ebf5f8d8f006dda2c0ecd38b3)), closes [#101](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/101)
* list of requests - images ([e3a04f2](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/e3a04f2bbacc17017dd37fbe5aff0f433ceb736e)), closes [#101](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/101)
* list of requests - mockHospitals ([95e5070](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/95e5070fce4b8b972f393f4f2f0fb4ef4bd0b100)), closes [#101](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/101)
* list of requests - mockRequests ([5eee1a6](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/5eee1a6c5779d4673a29c47b2044a509cb584122)), closes [#101](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/101)
* list of requests - mockServices ([4f82a4a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4f82a4aea67ee7c3a1f5f6704aa349aeca026717)), closes [#101](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/101)
* list of requests - ReguestList ([0845408](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/0845408e76544071d666816c52e09800963e8a0b)), closes [#101](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/101)
* list of requests - RequestCard ([08d84b8](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/08d84b8dd3422472ced86208b56cc730297eedad)), closes [#101](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/101)
* list of requests - types ([166ee42](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/166ee42573bdfee068deb7ee94f1a075b5efc9c0)), closes [#101](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/101)

## [1.1.0-beta.1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.3-beta.1...v1.1.0-beta.1) (2025-04-08)


### Features

* add dependency change-case ([9b29cc0](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9b29cc0a0eb6b3ae7714e29208a42f9efff7a922))
* bump @qwik/auth and @auth/core ([7028914](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/702891477aed6115415065c90064993673eb0e35))
* bump qwik to v1.12.0 ([6b9cae8](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6b9cae8f5281d5d2629852238152c05231ce5900))
* bump ui-components to v0.30.0 ([545fcb3](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/545fcb373dd2b05f370d667a17175f954fd6f4fa))
* ceate base of application forms ([be5d17e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/be5d17ea88e2837877a4f2acc2a303253db66ff5)), closes [#83](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/83)
* create calendar component ([55afd60](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/55afd60a95a8e5696c71b7b92190a8b13a6fe0e7))
* create cdr planning base ([1b4bd48](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1b4bd4898e5879dbf6c448d6b26eb6e510a32428))
* rewrite auth process ([f91c879](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f91c879ef77d4871fdf9ca4ce4c3a8d587c51278))
* update iris client schema ([54cfcdc](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/54cfcdc94e0afcde8be66bbdc7cb458c05481a12))
* update iris client schema ([91a58df](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/91a58df4b0d218a4ce95a56e4ff371491d53577f))
* update iris client schema ([a7ebe68](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/a7ebe68dd0fbf1e739dec3a9efb2aa18b417b3fa))
* update queries for patient autocomplete ([f9ce61d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f9ce61d733005659c52a1596d885b20ea0077f3d))
* update user login ([84cb111](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/84cb111b260510b16fef355379e28a4426d8b804))


### Bug Fixes

* upgrade qwik from v1.12.0 to v1.12.1 ([157d46d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/157d46de2d8940bbf2ce1d54bceebc1583ecf490))

## [1.0.3-beta.1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.2...v1.0.3-beta.1) (2024-12-02)


### Bug Fixes

* layout footer initialize as component ([6dbe00f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6dbe00f8c81319ff1024734ced3e7152a4f89d81))
* locale of body element in app root ([f67e39f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f67e39fad7b9a129203848ad940352f0867fc276))
* replace old route for signout ([23cee55](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/23cee55e38116e7265110db53c1d69a0928af1cc))
* settings in app manifest ([73a718f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/73a718fb4c9abb7c8fca19539c4ba0b951cd0324))

## [1.0.2](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.1...v1.0.2) (2024-11-20)


### Bug Fixes

* application title ([6c0e9f9](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6c0e9f9291ce4e11fd6afb717dc1b9e1e33ae29d))

## [1.0.1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0...v1.0.1) (2024-11-20)


### Bug Fixes

* add surgery admission to main navigation ([aa06a99](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/aa06a99544416ce465b9dab1635a3663af19814a))

## 1.0.0 (2024-11-20)


### Features

* add "careContext " into card detail ([9bea316](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9bea31659d9a9bf36eddd22807d24fa44747b48f)), closes [#31](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/31)
* add "interventionsForBereaved" into card detail ([365196a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/365196aa85539c9a0cb32886c86891f91983700d)), closes [#26](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/26)
* add "signal code" ([1d3a2f0](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1d3a2f03b6bb26ef5b5de9940aad9b70950234fd)), closes [#27](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/27)
* add @akeso/utils package ([639fde4](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/639fde4eaa90deddc4f9553e4dbdf58d82107346))
* add action button ([b5f9a1f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5f9a1f8bd137d2edb61ce38247809b58fcdb2f4))
* add attendies to palliative care intervention ([d94e97b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d94e97b5dba916a06add78c769d17f3963d2c25c))
* add attendies to palliative care intervention ([6465cfd](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6465cfd3dc8f92d56cc2db19437e96a671cfbf01))
* add block "Surprise question" ([aa33809](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/aa3380965b66839bee8821cd6f33d88825abe3e8)), closes [#30](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/30)
* add button with confirmation common component ([c740b03](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c740b03bd795d97577880c9f72e8be37f728d0a4))
* add class prop to page breadcrumbs component ([d2d7b39](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d2d7b39e492df4660bf35e6ec55a7f6faaa6bffe))
* add feature card navigation components ([4980d27](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4980d270c2b1ef85aa2e0e572c97d12c0419b9bd))
* add goalOfCare, end of care ([3dbfd03](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/3dbfd035865dc0ed9bc077bb95b0231af796ff53)), closes [#37](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/37) [#36](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/36)
* add GQL subsriptions ([04c9f8b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/04c9f8b4f8ba32ad2003f97e7ac1cba06d360ad1))
* add hooks to resolve user features ([39156ba](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/39156ba5d64e710d7bbdcb2ee64ef37cece2678d))
* add icon of lock ([7338fb5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/7338fb50ed589b7b4e6b41ce69faafb851d46a34))
* add input comp ([f12b346](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f12b346ce55909a883b418a2163ab9f5f09a8474))
* add inters patient expectation ([f70e809](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f70e8099bb0c4e6587ac5d2c1b650355a0ca7acb)), closes [#1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/1) [#12](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/12) [#13](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/13) [#14](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/14)
* add list item date time common component ([b93934b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b93934b2d113db7e429f41685b1371e44c948318))
* add notes to patient expectation ([6fb15f7](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6fb15f79dd3d614418b2a4769c7e6a288b6a72b4)), closes [#1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/1)
* add palliative care feature navigation ([2040f67](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2040f67ad54d26139b53e7447eb5fb34cd599492))
* add realtime to interns expectations ([de10cc0](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/de10cc09d251e0de3e4238ed56318505833c71d4))
* add typography settings to taiwind theme config ([b5314d3](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5314d3f5a62eb86b9d3e96ebf05e8baeb800d67))
* admission list for surgery operation ([8622ff2](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8622ff2758ba4d2bfd8b8921135a1a14ee76a31f)), closes [#62](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/62)
* auth user with new employee info ([63876d2](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/63876d2453f762687525ed91f7ada76d75a4dab5))
* backup code of old root page ([ff7a59d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/ff7a59df81c74d7e6b590454ab53e85618581adc))
* bump @akeso/utils to v0.10.0 ([8d814d5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8d814d5d8fc39299a99d0d7144fa372abf8e5dd6))
* bump @akeso/utils to v0.6.0 ([8ffd910](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8ffd910202f4d32b12ae3cf82d4521f22fb83e57)), closes [#43](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/43)
* bump @akeso/utils to v0.7.0 ([cbfc290](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cbfc29079f9ed50cfaa7e74346f8855759e8f827))
* bump @auth/quick to v0.2.3 ([ab34842](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/ab348428a6fb501d675d7e33b84df5b57205f220))
* bump @auth/qwik to v0.4.0 ([a22f2b8](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/a22f2b8061219b4951649054b73c19fd16b1d137))
* bump qwik to 1.7.3 ([8d91ba6](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8d91ba6da3bb54bdd2116636b3d26be1ff920bdb))
* bump qwik to v0.5.7 ([4a44089](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4a44089d6c26e01a88360fff8b27b87eda82fe2b))
* bump ui-components version to v0.18.0 ([c7291b5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c7291b58b97f214d914cfdf92bfb970f39eb86cf))
* bump valibot to v0.37.0 ([bbcf4ec](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/bbcf4ecf1b0a2f7de36e308cb688f0d601a64737))
* card detail - block "department" ([abb3351](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/abb3351c7ab043137a3353a28134484a7060dad5)), closes [#28](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/28)
* card detail - block "diagnosis" ([b401972](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b401972820ca2ef3d2a2a698e91ac132dc4a8e70)), closes [#29](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/29)
* change labels in surgery admission navigation card ([6cf8c2c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6cf8c2ceebc930f4d3db56f2626eded7d466fc29))
* change route structure of interns ambulace expectations ([2139258](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2139258acbe8ba6dbffc98cc30c6ab58ec158115))
* change time font in ListItemDateTime component ([6662f12](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6662f12862b69e8892e4b2f67b1be6333d1dd243))
* create interns sub pages ([b532028](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b532028ab58cff4914a979c5c116c5f58f98845d))
* create PageProgressHorizontal component set ([282fff5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/282fff5b29b06b50eed3d953173afad1b6b1ae80))
* create palliative card ([cb90a63](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cb90a63a67d3eed564e303e4d3c04bab888bbc8d)), closes [#24](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/24)
* disable fields in interns amb expectation detail ([b5b5aec](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5b5aec72ed308edf6041527e76ad6d980e41e22))
* disable iris-net subscriptions ([da639ad](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/da639ad9c64886aa147bb1bc80350f16836a1549))
* employee access ([38f2b66](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/38f2b6624fb8cc21a50bc66dba4d76fcfe9ae219))
* expektace pacienta obcansky prukaz ([438b676](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/438b67623123e6b1771ef80941acc9591aa2b9d1)), closes [#19](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/19)
* expektace pacienta odber biologickeho materialu ([96845aa](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/96845aa5a92dc8d220689f56f831a4a66842056d)), closes [#15](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/15)
* expektace pacienta odchod ([cd7d5b9](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cd7d5b9cb5e3d0cf7c95e45add665368a5a5fb8d)), closes [#17](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/17)
* expektace pacienta prukaz pojistence ([42052b6](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/42052b678a13fcbfc902bdc6692331addb8cab1b)), closes [#18](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/18)
* expektace pacienta transport ([9af664d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9af664d398417df17d0d157324daae7c23a8ec59)), closes [#16](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/16)
* export wholo iris shcema from client ([01890e6](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/01890e65c0fbe533b2ff53d25a6faa1fa3896cd3))
* extract auth user features to separate function ([2f84dce](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2f84dce6e3e5d356c1075d6b23bf203100274f07))
* finalize surgery admission ([849ba3c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/849ba3c676b68edae14b2e34010b942cae7a6d47))
* fix build errors ([3f762d8](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/3f762d8d452fa7448828f842ea42ace99503eb7c))
* get iris user profile ([9a3e069](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9a3e069eb6b5fc7d47526ec44e4087b2db2499b5)), closes [#39](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/39)
* hide left navigation bar ([4be0b7b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4be0b7b4e1353291572e413fe60b269f8e5f94c5)), closes [#38](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/38)
* implement gql subscriptions via SSE ([9374281](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/937428152304ccbe597a07f1f6ffe713cd5193bb))
* initial version ([4818f87](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4818f87a881da77d1fc6875aa37bf26247e288d6))
* interns expectation basis ([65140af](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/65140af8177e6d71061f619fe001cd956a1d0b4d))
* **interns expectation:** change layout ([599d9e1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/599d9e1c8fd355ba7a2bcf096e9d5e67a12f7817)), closes [#51](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/51) [#52](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/52) [#55](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/55)
* **interns expectation:** editable ordinations and medications ([dbdaa2d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/dbdaa2d0776adb6f19ee9223497bc5fd13112c35)), closes [#53](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/53)
* list of cards filtration + responsivity ([ab06aec](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/ab06aecd832716596accbc05bdc6703a789f6c4a)), closes [#21](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/21)
* list of cards filtration + responsivity ([45f4885](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/45f4885e258d86cf519414e6b25b38cb6bf6aa35)), closes [#21](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/21)
* load patient anamnesis ([b5ab19e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5ab19eae81f453964009bb51d6f1a5638f5c7f0))
* lock interns amb expectation reported sub records ([89e1a1f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/89e1a1f7871bd71608867054548cbadb22b2ec57))
* make dashbord new root page ([e043fb1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/e043fb1b52f7cb9b0b36e832528ed3d07c771d45))
* make login page as primary landing page ([5582491](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/55824914ea539f27190ed46a53feac87960e9fc3))
* make textarea height adaptable to content ([2f7c0f8](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2f7c0f83d4d1dfeafe64b4aa065f6167fea07536))
* merge epic expektace pacienta ([b8dedfb](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b8dedfb4056a3c2de35519375a6f07ee49dc2cbe))
* migrate interns expectation from iris-net to iris-herb ([b482908](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b482908a9d583c66b920ac987885ee9933c62105))
* move auth redirection to layout ([c7b09a4](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c7b09a4d138940c45e0d83d88e165ff9b2e87156))
* move iris folder ([eef9713](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/eef9713d1504e0fe16be523cc11893df36b08256))
* nová intervence a seznam intervencí ([f51f689](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f51f6896195944c7a4ad3d5ff159a9d7130e1cf1)), closes [#32](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/32) [#33](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/33)
* order palliative messages ([a5d2b56](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/a5d2b562165bc5cc7a203ed9e30ea70bcd380e84))
* ostatní změněné soubory ([e484c3f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/e484c3fec0944a8aab8d9c759a2bb44b008886a0))
* paging, intervention update ([5d2af7c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/5d2af7cfccf22531e2217b687ddecd8460ef17e5))
* palliative routes, list, detail ([4b3d74b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4b3d74b23c32d5bc06b83dc6e510e8a0347539f1)), closes [#21](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/21) [#22](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/22) [#23](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/23)
* prepare surgery admission feature implementation ([6b74a3f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6b74a3fa2edbe879b25a7d1eb16c7a821959dc3e)), closes [#62](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/62)
* remove debug from home page ([9d889a5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9d889a593cd2206147da56e58da4970b21f2b9cb))
* remove package graphql-sse ([8d006fa](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8d006fa9ceab01851e3db7168c39bd7374ffe805))
* remove unspecified texts from home page ([0a4674f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/0a4674fbff96f17726b1e369df9275155e0ad4c9)), closes [#39](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/39)
* show features on dashboard according to user perms ([b3c3a54](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b3c3a543c7c0cf369a574eed040bedc327b5a4c3))
* show only permitted main nav items ([eff2bce](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/eff2bce09a087818b9053daa35504fec65657f24))
* simplify user features resolving ([8cd7e88](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8cd7e880b78f30f4941f04055947f458b47e9b7c))
* store selected hospital in cookie ([b5947ca](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5947ca2727ef08361737c080248cf8437c4334b))
* stretch editor to whole available height ([b6f8909](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b6f890997652649df98b126814d9ac3d582b1760))
* style login page ([987b0ba](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/987b0ba7816a598cf773d2d2d9c1d421e8a4cd63)), closes [#39](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/39)
* surgery dashboard without test content ([978846c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/978846c9be2e11f0a196724559e095ca9ec167c1))
* try redirect from HP to dashboard if one is authenticated ([b688c1c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b688c1cdd8e59971b5d37f046dd947ac3a103fcb))
* update iris client ([1b8bc5f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1b8bc5fc7ae60c8f5840d048807f2f143c3fb493))
* update iris client definition ([5c5943c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/5c5943c67356c4b6b48fa7c2276600db763fbfed))
* update iris client schema ([c1f1d72](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c1f1d7240fd34293601b1ecd5710419f79ed0f2b))
* update iris client schema ([13a2e84](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/13a2e841e1447d1f1970c9e4264c6d6896844cb6))
* update iris client schema ([de82e51](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/de82e5104f9f5e8820c721d033a5a9fc55f67baf))
* update iris client schema ([1db28e5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1db28e59e8e4a2160bb44ed897b90cb9ea5240bd))
* update iris client schema ([fe50d2f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/fe50d2f9c570b983e372a8f518378b7a542c2ca3))
* update iris client schema ([56271df](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/56271df3aed17d20f50343fb8b991056368df71c))
* update labels and helper texts in new palliative care card ([8d8c57a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8d8c57aa015dd7445874bb5dce47a8268f5e73f0))
* update markup and refactor palliative care module ([3c31c0a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/3c31c0abc8fa2c43be46e440f28d6a23f24b1406))
* update routes to dashboard ([b4e84ae](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b4e84aee330477c888d8568977720183b6897c71))
* update schema of iris client ([8c81efd](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8c81efd9c6374c4cf09070dc7062e035539c2b43))
* update subscriptions server ([fca6e45](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/fca6e456d2679269016bbeeb08872ab399365215))
* update surgery admission page layouts ([f26b8ec](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f26b8ec7e27f9991be9cd2fe0631177ae0accefc))
* update valibot schemas to reflect new version api ([c12046e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c12046ee3e9a0897f6dab0035461f06085a2f8d2))
* updated iris client definition ([07c70cb](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/07c70cb34447559287ac176dec9c441a60d6d496))
* updated main layout cache controll settings ([1839326](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/183932657256d44723d3b056db492909345f0b2d))
* utilize feature nav cards on dashboard ([cd9e00e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cd9e00e606ed9187f08cae780fc37fce63abfe46))
* utilize subscriptions provider ([d0a7f8d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d0a7f8d17b18d320ebf81c0427f5db5032fd1403))


### Bug Fixes

* add @auth/core as dependency ([0059165](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/0059165d5fcb7c22eccb8f47ae7c92308caf017b))
* add editable flag to interns amb expectation fields ([f969290](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f969290b14fe50c1dbf72ff71303ccc646df2de0))
* add login redirect debug logs ([bf21b0d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/bf21b0dd2ff41fb3b72916d6f5d1d9d67d88b683))
* add redirect debug log ([ccf264a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/ccf264a5a1b1c76bf18107aa51ba20323aac5b96))
* bump @akeso/ui-components to v0.23.2 ([23648fc](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/23648fcc2665d46d54803dd73289edb318fd4882))
* bump tailwindcss to v3.4.10 ([8a7f6ae](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8a7f6ae0af6dcd57ff80d38d0ba0f03d0a39d648))
* check parent expectationId ([c83ce61](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c83ce610baf9b826b8e461a61cac6510137a19cb)), closes [#48](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/48)
* correctly close confirmation dialog ([8034546](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/803454638b7a28a2c6c74ac2695f60d476ba8b57))
* done internas ambulance expectation ordination ([cda6e8c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cda6e8cd220ce7e5f5100c00a17c8754f7f405fc))
* drawer position prop is required ([2154a74](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2154a7451622b7a23ddc7964a6c3a99d5a7cebc3))
* import of iris artefacts ([48b277f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/48b277f82e7a799fcd80794d15cbdd2ea2a084d7))
* import production app css in root ([86f12fe](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/86f12fea5cf85e95da29301cb6e0850e350602d9))
* **interns expectation:** typo in labels ([a5a1c9d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/a5a1c9daf13e80e2f03bf452ad45f27368878e99)), closes [#40](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/40)
* layout of expectation crossroad page ([7b435fe](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/7b435fe3e957a2151691f962d66b5446f63d2a38))
* move package uuid from devdeps to deps ([60655cf](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/60655cf4be3317c347b470e3d52d77b8669cb9ef))
* next button label in first step of surgery admission ([d5ab70d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d5ab70dd03b39b393111dee13bed47045bb7d982))
* nodemailer and motion as deps ([acb2c2e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/acb2c2e93d993791ca822ccec352490f04a8562d))
* on auth redirection ([8a64053](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8a64053c0087471e258577ed3b371e11fe7c7390))
* patient autocomplete input typing ([f852f17](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f852f170794b28339e1000fd6a2a8b09f9276e2b))
* propagate context update to dialogs ([78a7793](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/78a779336d2849919c7bb0fdfd13f4d4acfbda66)), closes [#48](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/48)
* remove debug messages ([d863b53](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d863b536d55721e407eaa2b7296b8e3f4cdab1c8))
* replace uuid package usage with fake implementation ([eacffac](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/eacffac879f90c8260dd8339578d87dbe824dd90))
* reset interns expectation ordination form ([80da5ee](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/80da5eee05ae85912fe2c1379ddc366356cf8e10))
* select currect hospital after empl profile changes ([1ecf413](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1ecf413c0f15b1685d24ecf8e9519694090c9979))
* surgery medition with no entered items ([368b042](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/368b042fe21bec1b3ccbdd1815d73645f7fb685b))
* typing errors ([15c0f76](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/15c0f76e0ac375a85b1778938a8bf8edb164642f))
* typo on dashboard ([247eaab](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/247eaabd60fa57054e9f0d5d6a80f930b87927f7))
* update done button in interns expectation medications ([b3b7e18](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b3b7e18419deeea83c3b5eeec9c5fae950086be3))
* update interns expectation lists ([fea31ab](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/fea31abb39b1b9c24a019131d16da3ac78b0a88d))

## [1.0.0-rc.6](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2024-11-20)


### Features

* add hooks to resolve user features ([39156ba](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/39156ba5d64e710d7bbdcb2ee64ef37cece2678d))
* add typography settings to taiwind theme config ([b5314d3](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5314d3f5a62eb86b9d3e96ebf05e8baeb800d67))
* admission list for surgery operation ([8622ff2](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8622ff2758ba4d2bfd8b8921135a1a14ee76a31f)), closes [#62](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/62)
* bump @akeso/utils to v0.10.0 ([8d814d5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8d814d5d8fc39299a99d0d7144fa372abf8e5dd6))
* bump @auth/qwik to v0.4.0 ([a22f2b8](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/a22f2b8061219b4951649054b73c19fd16b1d137))
* change labels in surgery admission navigation card ([6cf8c2c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6cf8c2ceebc930f4d3db56f2626eded7d466fc29))
* create PageProgressHorizontal component set ([282fff5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/282fff5b29b06b50eed3d953173afad1b6b1ae80))
* finalize surgery admission ([849ba3c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/849ba3c676b68edae14b2e34010b942cae7a6d47))
* load patient anamnesis ([b5ab19e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5ab19eae81f453964009bb51d6f1a5638f5c7f0))
* prepare surgery admission feature implementation ([6b74a3f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6b74a3fa2edbe879b25a7d1eb16c7a821959dc3e)), closes [#62](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/62)
* simplify user features resolving ([8cd7e88](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8cd7e880b78f30f4941f04055947f458b47e9b7c))
* stretch editor to whole available height ([b6f8909](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b6f890997652649df98b126814d9ac3d582b1760))
* surgery dashboard without test content ([978846c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/978846c9be2e11f0a196724559e095ca9ec167c1))
* update iris client schema ([c1f1d72](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c1f1d7240fd34293601b1ecd5710419f79ed0f2b))
* update iris client schema ([13a2e84](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/13a2e841e1447d1f1970c9e4264c6d6896844cb6))
* update iris client schema ([de82e51](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/de82e5104f9f5e8820c721d033a5a9fc55f67baf))
* update surgery admission page layouts ([f26b8ec](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f26b8ec7e27f9991be9cd2fe0631177ae0accefc))


### Bug Fixes

* next button label in first step of surgery admission ([d5ab70d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d5ab70dd03b39b393111dee13bed47045bb7d982))
* select currect hospital after empl profile changes ([1ecf413](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1ecf413c0f15b1685d24ecf8e9519694090c9979))
* surgery medition with no entered items ([368b042](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/368b042fe21bec1b3ccbdd1815d73645f7fb685b))

## [1.0.0-beta.21](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.20...v1.0.0-beta.21) (2024-11-20)


### Features

* add hooks to resolve user features ([39156ba](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/39156ba5d64e710d7bbdcb2ee64ef37cece2678d))
* add typography settings to taiwind theme config ([b5314d3](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5314d3f5a62eb86b9d3e96ebf05e8baeb800d67))
* admission list for surgery operation ([8622ff2](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8622ff2758ba4d2bfd8b8921135a1a14ee76a31f)), closes [#62](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/62)
* bump @akeso/utils to v0.10.0 ([8d814d5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8d814d5d8fc39299a99d0d7144fa372abf8e5dd6))
* bump @auth/qwik to v0.4.0 ([a22f2b8](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/a22f2b8061219b4951649054b73c19fd16b1d137))
* change labels in surgery admission navigation card ([6cf8c2c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6cf8c2ceebc930f4d3db56f2626eded7d466fc29))
* create PageProgressHorizontal component set ([282fff5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/282fff5b29b06b50eed3d953173afad1b6b1ae80))
* finalize surgery admission ([849ba3c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/849ba3c676b68edae14b2e34010b942cae7a6d47))
* load patient anamnesis ([b5ab19e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5ab19eae81f453964009bb51d6f1a5638f5c7f0))
* prepare surgery admission feature implementation ([6b74a3f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6b74a3fa2edbe879b25a7d1eb16c7a821959dc3e)), closes [#62](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/62)
* simplify user features resolving ([8cd7e88](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8cd7e880b78f30f4941f04055947f458b47e9b7c))
* stretch editor to whole available height ([b6f8909](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b6f890997652649df98b126814d9ac3d582b1760))
* surgery dashboard without test content ([978846c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/978846c9be2e11f0a196724559e095ca9ec167c1))
* update iris client schema ([c1f1d72](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c1f1d7240fd34293601b1ecd5710419f79ed0f2b))
* update iris client schema ([13a2e84](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/13a2e841e1447d1f1970c9e4264c6d6896844cb6))
* update iris client schema ([de82e51](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/de82e5104f9f5e8820c721d033a5a9fc55f67baf))
* update surgery admission page layouts ([f26b8ec](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f26b8ec7e27f9991be9cd2fe0631177ae0accefc))


### Bug Fixes

* next button label in first step of surgery admission ([d5ab70d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d5ab70dd03b39b393111dee13bed47045bb7d982))
* select currect hospital after empl profile changes ([1ecf413](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1ecf413c0f15b1685d24ecf8e9519694090c9979))
* surgery medition with no entered items ([368b042](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/368b042fe21bec1b3ccbdd1815d73645f7fb685b))

## [1.0.0-rc.5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2024-10-07)


### Features

* backup code of old root page ([ff7a59d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/ff7a59df81c74d7e6b590454ab53e85618581adc))
* make dashbord new root page ([e043fb1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/e043fb1b52f7cb9b0b36e832528ed3d07c771d45))
* make login page as primary landing page ([5582491](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/55824914ea539f27190ed46a53feac87960e9fc3))
* update routes to dashboard ([b4e84ae](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b4e84aee330477c888d8568977720183b6897c71))

## [1.0.0-beta.20](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.19...v1.0.0-beta.20) (2024-10-07)


### Features

* backup code of old root page ([ff7a59d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/ff7a59df81c74d7e6b590454ab53e85618581adc))
* make dashbord new root page ([e043fb1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/e043fb1b52f7cb9b0b36e832528ed3d07c771d45))
* make login page as primary landing page ([5582491](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/55824914ea539f27190ed46a53feac87960e9fc3))
* update routes to dashboard ([b4e84ae](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b4e84aee330477c888d8568977720183b6897c71))

## [1.0.0-rc.4](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2024-10-07)


### Features

* add "careContext " into card detail ([9bea316](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9bea31659d9a9bf36eddd22807d24fa44747b48f)), closes [#31](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/31)
* add "interventionsForBereaved" into card detail ([365196a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/365196aa85539c9a0cb32886c86891f91983700d)), closes [#26](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/26)
* add "signal code" ([1d3a2f0](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1d3a2f03b6bb26ef5b5de9940aad9b70950234fd)), closes [#27](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/27)
* add attendies to palliative care intervention ([d94e97b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d94e97b5dba916a06add78c769d17f3963d2c25c))
* add attendies to palliative care intervention ([6465cfd](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6465cfd3dc8f92d56cc2db19437e96a671cfbf01))
* add block "Surprise question" ([aa33809](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/aa3380965b66839bee8821cd6f33d88825abe3e8)), closes [#30](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/30)
* add goalOfCare, end of care ([3dbfd03](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/3dbfd035865dc0ed9bc077bb95b0231af796ff53)), closes [#37](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/37) [#36](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/36)
* add palliative care feature navigation ([2040f67](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2040f67ad54d26139b53e7447eb5fb34cd599492))
* bump valibot to v0.37.0 ([bbcf4ec](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/bbcf4ecf1b0a2f7de36e308cb688f0d601a64737))
* card detail - block "department" ([abb3351](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/abb3351c7ab043137a3353a28134484a7060dad5)), closes [#28](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/28)
* card detail - block "diagnosis" ([b401972](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b401972820ca2ef3d2a2a698e91ac132dc4a8e70)), closes [#29](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/29)
* create palliative card ([cb90a63](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cb90a63a67d3eed564e303e4d3c04bab888bbc8d)), closes [#24](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/24)
* extract auth user features to separate function ([2f84dce](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2f84dce6e3e5d356c1075d6b23bf203100274f07))
* list of cards filtration + responsivity ([ab06aec](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/ab06aecd832716596accbc05bdc6703a789f6c4a)), closes [#21](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/21)
* list of cards filtration + responsivity ([45f4885](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/45f4885e258d86cf519414e6b25b38cb6bf6aa35)), closes [#21](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/21)
* nová intervence a seznam intervencí ([f51f689](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f51f6896195944c7a4ad3d5ff159a9d7130e1cf1)), closes [#32](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/32) [#33](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/33)
* order palliative messages ([a5d2b56](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/a5d2b562165bc5cc7a203ed9e30ea70bcd380e84))
* paging, intervention update ([5d2af7c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/5d2af7cfccf22531e2217b687ddecd8460ef17e5))
* palliative routes, list, detail ([4b3d74b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4b3d74b23c32d5bc06b83dc6e510e8a0347539f1)), closes [#21](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/21) [#22](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/22) [#23](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/23)
* show only permitted main nav items ([eff2bce](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/eff2bce09a087818b9053daa35504fec65657f24))
* store selected hospital in cookie ([b5947ca](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5947ca2727ef08361737c080248cf8437c4334b))
* update iris client schema ([1db28e5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1db28e59e8e4a2160bb44ed897b90cb9ea5240bd))
* update iris client schema ([fe50d2f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/fe50d2f9c570b983e372a8f518378b7a542c2ca3))
* update labels and helper texts in new palliative care card ([8d8c57a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8d8c57aa015dd7445874bb5dce47a8268f5e73f0))
* update markup and refactor palliative care module ([3c31c0a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/3c31c0abc8fa2c43be46e440f28d6a23f24b1406))
* update valibot schemas to reflect new version api ([c12046e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c12046ee3e9a0897f6dab0035461f06085a2f8d2))


### Bug Fixes

* patient autocomplete input typing ([f852f17](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f852f170794b28339e1000fd6a2a8b09f9276e2b))

## [1.0.0-beta.19](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.18...v1.0.0-beta.19) (2024-10-04)


### Features

* add "careContext " into card detail ([9bea316](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9bea31659d9a9bf36eddd22807d24fa44747b48f)), closes [#31](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/31)
* add "interventionsForBereaved" into card detail ([365196a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/365196aa85539c9a0cb32886c86891f91983700d)), closes [#26](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/26)
* add "signal code" ([1d3a2f0](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1d3a2f03b6bb26ef5b5de9940aad9b70950234fd)), closes [#27](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/27)
* add attendies to palliative care intervention ([d94e97b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d94e97b5dba916a06add78c769d17f3963d2c25c))
* add attendies to palliative care intervention ([6465cfd](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6465cfd3dc8f92d56cc2db19437e96a671cfbf01))
* add block "Surprise question" ([aa33809](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/aa3380965b66839bee8821cd6f33d88825abe3e8)), closes [#30](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/30)
* add goalOfCare, end of care ([3dbfd03](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/3dbfd035865dc0ed9bc077bb95b0231af796ff53)), closes [#37](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/37) [#36](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/36)
* add palliative care feature navigation ([2040f67](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2040f67ad54d26139b53e7447eb5fb34cd599492))
* bump valibot to v0.37.0 ([bbcf4ec](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/bbcf4ecf1b0a2f7de36e308cb688f0d601a64737))
* card detail - block "department" ([abb3351](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/abb3351c7ab043137a3353a28134484a7060dad5)), closes [#28](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/28)
* card detail - block "diagnosis" ([b401972](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b401972820ca2ef3d2a2a698e91ac132dc4a8e70)), closes [#29](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/29)
* create palliative card ([cb90a63](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cb90a63a67d3eed564e303e4d3c04bab888bbc8d)), closes [#24](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/24)
* extract auth user features to separate function ([2f84dce](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2f84dce6e3e5d356c1075d6b23bf203100274f07))
* list of cards filtration + responsivity ([ab06aec](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/ab06aecd832716596accbc05bdc6703a789f6c4a)), closes [#21](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/21)
* list of cards filtration + responsivity ([45f4885](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/45f4885e258d86cf519414e6b25b38cb6bf6aa35)), closes [#21](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/21)
* nová intervence a seznam intervencí ([f51f689](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f51f6896195944c7a4ad3d5ff159a9d7130e1cf1)), closes [#32](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/32) [#33](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/33)
* order palliative messages ([a5d2b56](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/a5d2b562165bc5cc7a203ed9e30ea70bcd380e84))
* paging, intervention update ([5d2af7c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/5d2af7cfccf22531e2217b687ddecd8460ef17e5))
* palliative routes, list, detail ([4b3d74b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4b3d74b23c32d5bc06b83dc6e510e8a0347539f1)), closes [#21](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/21) [#22](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/22) [#23](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/23)
* show only permitted main nav items ([eff2bce](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/eff2bce09a087818b9053daa35504fec65657f24))
* store selected hospital in cookie ([b5947ca](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5947ca2727ef08361737c080248cf8437c4334b))
* update iris client schema ([1db28e5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1db28e59e8e4a2160bb44ed897b90cb9ea5240bd))
* update iris client schema ([fe50d2f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/fe50d2f9c570b983e372a8f518378b7a542c2ca3))
* update labels and helper texts in new palliative care card ([8d8c57a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8d8c57aa015dd7445874bb5dce47a8268f5e73f0))
* update markup and refactor palliative care module ([3c31c0a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/3c31c0abc8fa2c43be46e440f28d6a23f24b1406))
* update valibot schemas to reflect new version api ([c12046e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c12046ee3e9a0897f6dab0035461f06085a2f8d2))


### Bug Fixes

* patient autocomplete input typing ([f852f17](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f852f170794b28339e1000fd6a2a8b09f9276e2b))

## [1.0.0-rc.3](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2024-09-09)


### Bug Fixes

* bump tailwindcss to v3.4.10 ([8a7f6ae](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8a7f6ae0af6dcd57ff80d38d0ba0f03d0a39d648))
* layout of expectation crossroad page ([7b435fe](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/7b435fe3e957a2151691f962d66b5446f63d2a38))

## [1.0.0-beta.18](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.17...v1.0.0-beta.18) (2024-09-09)


### Bug Fixes

* bump tailwindcss to v3.4.10 ([8a7f6ae](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8a7f6ae0af6dcd57ff80d38d0ba0f03d0a39d648))
* layout of expectation crossroad page ([7b435fe](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/7b435fe3e957a2151691f962d66b5446f63d2a38))

## [1.0.0-rc.2](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2024-09-09)


### Features

* add class prop to page breadcrumbs component ([d2d7b39](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d2d7b39e492df4660bf35e6ec55a7f6faaa6bffe))
* bump @akeso/utils to v0.6.0 ([8ffd910](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8ffd910202f4d32b12ae3cf82d4521f22fb83e57)), closes [#43](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/43)
* bump @akeso/utils to v0.7.0 ([cbfc290](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cbfc29079f9ed50cfaa7e74346f8855759e8f827))
* **interns expectation:** change layout ([599d9e1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/599d9e1c8fd355ba7a2bcf096e9d5e67a12f7817)), closes [#51](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/51) [#52](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/52) [#55](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/55)
* **interns expectation:** editable ordinations and medications ([dbdaa2d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/dbdaa2d0776adb6f19ee9223497bc5fd13112c35)), closes [#53](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/53)
* update iris client schema ([56271df](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/56271df3aed17d20f50343fb8b991056368df71c))


### Bug Fixes

* bump @akeso/ui-components to v0.23.2 ([23648fc](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/23648fcc2665d46d54803dd73289edb318fd4882))
* check parent expectationId ([c83ce61](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c83ce610baf9b826b8e461a61cac6510137a19cb)), closes [#48](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/48)
* drawer position prop is required ([2154a74](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2154a7451622b7a23ddc7964a6c3a99d5a7cebc3))
* **interns expectation:** typo in labels ([a5a1c9d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/a5a1c9daf13e80e2f03bf452ad45f27368878e99)), closes [#40](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/40)
* propagate context update to dialogs ([78a7793](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/78a779336d2849919c7bb0fdfd13f4d4acfbda66)), closes [#48](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/48)
* typo on dashboard ([247eaab](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/247eaabd60fa57054e9f0d5d6a80f930b87927f7))

## [1.0.0-beta.17](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.16...v1.0.0-beta.17) (2024-08-23)


### Features

* update iris client schema ([56271df](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/56271df3aed17d20f50343fb8b991056368df71c))

## [1.0.0-beta.16](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.15...v1.0.0-beta.16) (2024-08-20)


### Bug Fixes

* drawer position prop is required ([2154a74](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2154a7451622b7a23ddc7964a6c3a99d5a7cebc3))

## [1.0.0-beta.15](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.14...v1.0.0-beta.15) (2024-08-20)


### Features

* add class prop to page breadcrumbs component ([d2d7b39](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d2d7b39e492df4660bf35e6ec55a7f6faaa6bffe))
* bump @akeso/utils to v0.6.0 ([8ffd910](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8ffd910202f4d32b12ae3cf82d4521f22fb83e57)), closes [#43](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/43)
* bump @akeso/utils to v0.7.0 ([cbfc290](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cbfc29079f9ed50cfaa7e74346f8855759e8f827))
* **interns expectation:** change layout ([599d9e1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/599d9e1c8fd355ba7a2bcf096e9d5e67a12f7817)), closes [#51](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/51) [#52](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/52) [#55](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/55)
* **interns expectation:** editable ordinations and medications ([dbdaa2d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/dbdaa2d0776adb6f19ee9223497bc5fd13112c35)), closes [#53](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/53)


### Bug Fixes

* bump @akeso/ui-components to v0.23.2 ([23648fc](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/23648fcc2665d46d54803dd73289edb318fd4882))
* check parent expectationId ([c83ce61](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c83ce610baf9b826b8e461a61cac6510137a19cb)), closes [#48](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/48)
* **interns expectation:** typo in labels ([a5a1c9d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/a5a1c9daf13e80e2f03bf452ad45f27368878e99)), closes [#40](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/40)
* propagate context update to dialogs ([78a7793](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/78a779336d2849919c7bb0fdfd13f4d4acfbda66)), closes [#48](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/48)
* typo on dashboard ([247eaab](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/247eaabd60fa57054e9f0d5d6a80f930b87927f7))

## 1.0.0-rc.1 (2024-08-05)


### Features

* add @akeso/utils package ([639fde4](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/639fde4eaa90deddc4f9553e4dbdf58d82107346))
* add action button ([b5f9a1f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5f9a1f8bd137d2edb61ce38247809b58fcdb2f4))
* add button with confirmation common component ([c740b03](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c740b03bd795d97577880c9f72e8be37f728d0a4))
* add feature card navigation components ([4980d27](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4980d270c2b1ef85aa2e0e572c97d12c0419b9bd))
* add GQL subsriptions ([04c9f8b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/04c9f8b4f8ba32ad2003f97e7ac1cba06d360ad1))
* add icon of lock ([7338fb5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/7338fb50ed589b7b4e6b41ce69faafb851d46a34))
* add input comp ([f12b346](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f12b346ce55909a883b418a2163ab9f5f09a8474))
* add inters patient expectation ([f70e809](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f70e8099bb0c4e6587ac5d2c1b650355a0ca7acb)), closes [#1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/1) [#12](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/12) [#13](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/13) [#14](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/14)
* add list item date time common component ([b93934b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b93934b2d113db7e429f41685b1371e44c948318))
* add notes to patient expectation ([6fb15f7](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6fb15f79dd3d614418b2a4769c7e6a288b6a72b4)), closes [#1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/1)
* add realtime to interns expectations ([de10cc0](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/de10cc09d251e0de3e4238ed56318505833c71d4))
* auth user with new employee info ([63876d2](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/63876d2453f762687525ed91f7ada76d75a4dab5))
* bump @auth/quick to v0.2.3 ([ab34842](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/ab348428a6fb501d675d7e33b84df5b57205f220))
* bump qwik to 1.7.3 ([8d91ba6](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8d91ba6da3bb54bdd2116636b3d26be1ff920bdb))
* bump qwik to v0.5.7 ([4a44089](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4a44089d6c26e01a88360fff8b27b87eda82fe2b))
* bump ui-components version to v0.18.0 ([c7291b5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c7291b58b97f214d914cfdf92bfb970f39eb86cf))
* change route structure of interns ambulace expectations ([2139258](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2139258acbe8ba6dbffc98cc30c6ab58ec158115))
* change time font in ListItemDateTime component ([6662f12](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6662f12862b69e8892e4b2f67b1be6333d1dd243))
* create interns sub pages ([b532028](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b532028ab58cff4914a979c5c116c5f58f98845d))
* disable fields in interns amb expectation detail ([b5b5aec](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5b5aec72ed308edf6041527e76ad6d980e41e22))
* disable iris-net subscriptions ([da639ad](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/da639ad9c64886aa147bb1bc80350f16836a1549))
* employee access ([38f2b66](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/38f2b6624fb8cc21a50bc66dba4d76fcfe9ae219))
* expektace pacienta obcansky prukaz ([438b676](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/438b67623123e6b1771ef80941acc9591aa2b9d1)), closes [#19](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/19)
* expektace pacienta odber biologickeho materialu ([96845aa](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/96845aa5a92dc8d220689f56f831a4a66842056d)), closes [#15](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/15)
* expektace pacienta odchod ([cd7d5b9](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cd7d5b9cb5e3d0cf7c95e45add665368a5a5fb8d)), closes [#17](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/17)
* expektace pacienta prukaz pojistence ([42052b6](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/42052b678a13fcbfc902bdc6692331addb8cab1b)), closes [#18](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/18)
* expektace pacienta transport ([9af664d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9af664d398417df17d0d157324daae7c23a8ec59)), closes [#16](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/16)
* export wholo iris shcema from client ([01890e6](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/01890e65c0fbe533b2ff53d25a6faa1fa3896cd3))
* fix build errors ([3f762d8](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/3f762d8d452fa7448828f842ea42ace99503eb7c))
* get iris user profile ([9a3e069](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9a3e069eb6b5fc7d47526ec44e4087b2db2499b5)), closes [#39](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/39)
* hide left navigation bar ([4be0b7b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4be0b7b4e1353291572e413fe60b269f8e5f94c5)), closes [#38](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/38)
* implement gql subscriptions via SSE ([9374281](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/937428152304ccbe597a07f1f6ffe713cd5193bb))
* initial version ([4818f87](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4818f87a881da77d1fc6875aa37bf26247e288d6))
* interns expectation basis ([65140af](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/65140af8177e6d71061f619fe001cd956a1d0b4d))
* lock interns amb expectation reported sub records ([89e1a1f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/89e1a1f7871bd71608867054548cbadb22b2ec57))
* make textarea height adaptable to content ([2f7c0f8](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2f7c0f83d4d1dfeafe64b4aa065f6167fea07536))
* merge epic expektace pacienta ([b8dedfb](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b8dedfb4056a3c2de35519375a6f07ee49dc2cbe))
* migrate interns expectation from iris-net to iris-herb ([b482908](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b482908a9d583c66b920ac987885ee9933c62105))
* move auth redirection to layout ([c7b09a4](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c7b09a4d138940c45e0d83d88e165ff9b2e87156))
* move iris folder ([eef9713](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/eef9713d1504e0fe16be523cc11893df36b08256))
* ostatní změněné soubory ([e484c3f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/e484c3fec0944a8aab8d9c759a2bb44b008886a0))
* remove debug from home page ([9d889a5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9d889a593cd2206147da56e58da4970b21f2b9cb))
* remove package graphql-sse ([8d006fa](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8d006fa9ceab01851e3db7168c39bd7374ffe805))
* remove unspecified texts from home page ([0a4674f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/0a4674fbff96f17726b1e369df9275155e0ad4c9)), closes [#39](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/39)
* show features on dashboard according to user perms ([b3c3a54](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b3c3a543c7c0cf369a574eed040bedc327b5a4c3))
* style login page ([987b0ba](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/987b0ba7816a598cf773d2d2d9c1d421e8a4cd63)), closes [#39](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/39)
* try redirect from HP to dashboard if one is authenticated ([b688c1c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b688c1cdd8e59971b5d37f046dd947ac3a103fcb))
* update iris client ([1b8bc5f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1b8bc5fc7ae60c8f5840d048807f2f143c3fb493))
* update iris client definition ([5c5943c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/5c5943c67356c4b6b48fa7c2276600db763fbfed))
* update schema of iris client ([8c81efd](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8c81efd9c6374c4cf09070dc7062e035539c2b43))
* update subscriptions server ([fca6e45](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/fca6e456d2679269016bbeeb08872ab399365215))
* updated iris client definition ([07c70cb](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/07c70cb34447559287ac176dec9c441a60d6d496))
* updated main layout cache controll settings ([1839326](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/183932657256d44723d3b056db492909345f0b2d))
* utilize feature nav cards on dashboard ([cd9e00e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cd9e00e606ed9187f08cae780fc37fce63abfe46))
* utilize subscriptions provider ([d0a7f8d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d0a7f8d17b18d320ebf81c0427f5db5032fd1403))


### Bug Fixes

* add @auth/core as dependency ([0059165](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/0059165d5fcb7c22eccb8f47ae7c92308caf017b))
* add editable flag to interns amb expectation fields ([f969290](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f969290b14fe50c1dbf72ff71303ccc646df2de0))
* add login redirect debug logs ([bf21b0d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/bf21b0dd2ff41fb3b72916d6f5d1d9d67d88b683))
* add redirect debug log ([ccf264a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/ccf264a5a1b1c76bf18107aa51ba20323aac5b96))
* correctly close confirmation dialog ([8034546](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/803454638b7a28a2c6c74ac2695f60d476ba8b57))
* done internas ambulance expectation ordination ([cda6e8c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cda6e8cd220ce7e5f5100c00a17c8754f7f405fc))
* import of iris artefacts ([48b277f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/48b277f82e7a799fcd80794d15cbdd2ea2a084d7))
* import production app css in root ([86f12fe](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/86f12fea5cf85e95da29301cb6e0850e350602d9))
* move package uuid from devdeps to deps ([60655cf](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/60655cf4be3317c347b470e3d52d77b8669cb9ef))
* nodemailer and motion as deps ([acb2c2e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/acb2c2e93d993791ca822ccec352490f04a8562d))
* on auth redirection ([8a64053](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8a64053c0087471e258577ed3b371e11fe7c7390))
* remove debug messages ([d863b53](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d863b536d55721e407eaa2b7296b8e3f4cdab1c8))
* replace uuid package usage with fake implementation ([eacffac](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/eacffac879f90c8260dd8339578d87dbe824dd90))
* reset interns expectation ordination form ([80da5ee](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/80da5eee05ae85912fe2c1379ddc366356cf8e10))
* typing errors ([15c0f76](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/15c0f76e0ac375a85b1778938a8bf8edb164642f))
* update done button in interns expectation medications ([b3b7e18](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b3b7e18419deeea83c3b5eeec9c5fae950086be3))
* update interns expectation lists ([fea31ab](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/fea31abb39b1b9c24a019131d16da3ac78b0a88d))

## [1.0.0-beta.14](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2024-08-05)


### Features

* remove debug from home page ([9d889a5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9d889a593cd2206147da56e58da4970b21f2b9cb))

## [1.0.0-beta.13](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2024-08-05)


### Features

* move auth redirection to layout ([c7b09a4](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c7b09a4d138940c45e0d83d88e165ff9b2e87156))

## [1.0.0-beta.12](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2024-08-05)


### Bug Fixes

* on auth redirection ([8a64053](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8a64053c0087471e258577ed3b371e11fe7c7390))

## [1.0.0-beta.11](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2024-08-05)


### Features

* try redirect from HP to dashboard if one is authenticated ([b688c1c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b688c1cdd8e59971b5d37f046dd947ac3a103fcb))

## [1.0.0-beta.10](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2024-08-05)


### Features

* bump @auth/quick to v0.2.3 ([ab34842](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/ab348428a6fb501d675d7e33b84df5b57205f220))

## [1.0.0-beta.9](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2024-08-05)


### Bug Fixes

* remove debug messages ([d863b53](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d863b536d55721e407eaa2b7296b8e3f4cdab1c8))

## [1.0.0-beta.8](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2024-08-05)


### Bug Fixes

* add login redirect debug logs ([bf21b0d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/bf21b0dd2ff41fb3b72916d6f5d1d9d67d88b683))

## [1.0.0-beta.7](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2024-08-05)


### Features

* updated main layout cache controll settings ([1839326](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/183932657256d44723d3b056db492909345f0b2d))

## [1.0.0-beta.6](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2024-08-05)


### Bug Fixes

* add redirect debug log ([ccf264a](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/ccf264a5a1b1c76bf18107aa51ba20323aac5b96))

## [1.0.0-beta.5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2024-08-05)


### Bug Fixes

* nodemailer and motion as deps ([acb2c2e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/acb2c2e93d993791ca822ccec352490f04a8562d))

## [1.0.0-beta.4](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2024-08-05)


### Bug Fixes

* replace uuid package usage with fake implementation ([eacffac](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/eacffac879f90c8260dd8339578d87dbe824dd90))

## [1.0.0-beta.3](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2024-08-05)


### Bug Fixes

* move package uuid from devdeps to deps ([60655cf](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/60655cf4be3317c347b470e3d52d77b8669cb9ef))

## [1.0.0-beta.2](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2024-08-05)


### Bug Fixes

* add @auth/core as dependency ([0059165](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/0059165d5fcb7c22eccb8f47ae7c92308caf017b))

## 1.0.0-beta.1 (2024-08-05)


### Features

* add @akeso/utils package ([639fde4](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/639fde4eaa90deddc4f9553e4dbdf58d82107346))
* add action button ([b5f9a1f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5f9a1f8bd137d2edb61ce38247809b58fcdb2f4))
* add button with confirmation common component ([c740b03](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c740b03bd795d97577880c9f72e8be37f728d0a4))
* add feature card navigation components ([4980d27](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4980d270c2b1ef85aa2e0e572c97d12c0419b9bd))
* add GQL subsriptions ([04c9f8b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/04c9f8b4f8ba32ad2003f97e7ac1cba06d360ad1))
* add icon of lock ([7338fb5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/7338fb50ed589b7b4e6b41ce69faafb851d46a34))
* add input comp ([f12b346](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f12b346ce55909a883b418a2163ab9f5f09a8474))
* add inters patient expectation ([f70e809](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f70e8099bb0c4e6587ac5d2c1b650355a0ca7acb)), closes [#1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/1) [#12](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/12) [#13](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/13) [#14](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/14)
* add list item date time common component ([b93934b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b93934b2d113db7e429f41685b1371e44c948318))
* add notes to patient expectation ([6fb15f7](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6fb15f79dd3d614418b2a4769c7e6a288b6a72b4)), closes [#1](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/1)
* add realtime to interns expectations ([de10cc0](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/de10cc09d251e0de3e4238ed56318505833c71d4))
* auth user with new employee info ([63876d2](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/63876d2453f762687525ed91f7ada76d75a4dab5))
* bump qwik to 1.7.3 ([8d91ba6](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8d91ba6da3bb54bdd2116636b3d26be1ff920bdb))
* bump qwik to v0.5.7 ([4a44089](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4a44089d6c26e01a88360fff8b27b87eda82fe2b))
* bump ui-components version to v0.18.0 ([c7291b5](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/c7291b58b97f214d914cfdf92bfb970f39eb86cf))
* change route structure of interns ambulace expectations ([2139258](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2139258acbe8ba6dbffc98cc30c6ab58ec158115))
* change time font in ListItemDateTime component ([6662f12](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/6662f12862b69e8892e4b2f67b1be6333d1dd243))
* create interns sub pages ([b532028](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b532028ab58cff4914a979c5c116c5f58f98845d))
* disable fields in interns amb expectation detail ([b5b5aec](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b5b5aec72ed308edf6041527e76ad6d980e41e22))
* disable iris-net subscriptions ([da639ad](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/da639ad9c64886aa147bb1bc80350f16836a1549))
* employee access ([38f2b66](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/38f2b6624fb8cc21a50bc66dba4d76fcfe9ae219))
* expektace pacienta obcansky prukaz ([438b676](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/438b67623123e6b1771ef80941acc9591aa2b9d1)), closes [#19](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/19)
* expektace pacienta odber biologickeho materialu ([96845aa](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/96845aa5a92dc8d220689f56f831a4a66842056d)), closes [#15](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/15)
* expektace pacienta odchod ([cd7d5b9](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cd7d5b9cb5e3d0cf7c95e45add665368a5a5fb8d)), closes [#17](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/17)
* expektace pacienta prukaz pojistence ([42052b6](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/42052b678a13fcbfc902bdc6692331addb8cab1b)), closes [#18](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/18)
* expektace pacienta transport ([9af664d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9af664d398417df17d0d157324daae7c23a8ec59)), closes [#16](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/16)
* export wholo iris shcema from client ([01890e6](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/01890e65c0fbe533b2ff53d25a6faa1fa3896cd3))
* fix build errors ([3f762d8](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/3f762d8d452fa7448828f842ea42ace99503eb7c))
* get iris user profile ([9a3e069](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/9a3e069eb6b5fc7d47526ec44e4087b2db2499b5)), closes [#39](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/39)
* hide left navigation bar ([4be0b7b](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4be0b7b4e1353291572e413fe60b269f8e5f94c5)), closes [#38](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/38)
* implement gql subscriptions via SSE ([9374281](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/937428152304ccbe597a07f1f6ffe713cd5193bb))
* initial version ([4818f87](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/4818f87a881da77d1fc6875aa37bf26247e288d6))
* interns expectation basis ([65140af](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/65140af8177e6d71061f619fe001cd956a1d0b4d))
* lock interns amb expectation reported sub records ([89e1a1f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/89e1a1f7871bd71608867054548cbadb22b2ec57))
* make textarea height adaptable to content ([2f7c0f8](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/2f7c0f83d4d1dfeafe64b4aa065f6167fea07536))
* merge epic expektace pacienta ([b8dedfb](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b8dedfb4056a3c2de35519375a6f07ee49dc2cbe))
* migrate interns expectation from iris-net to iris-herb ([b482908](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b482908a9d583c66b920ac987885ee9933c62105))
* move iris folder ([eef9713](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/eef9713d1504e0fe16be523cc11893df36b08256))
* ostatní změněné soubory ([e484c3f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/e484c3fec0944a8aab8d9c759a2bb44b008886a0))
* remove package graphql-sse ([8d006fa](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8d006fa9ceab01851e3db7168c39bd7374ffe805))
* remove unspecified texts from home page ([0a4674f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/0a4674fbff96f17726b1e369df9275155e0ad4c9)), closes [#39](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/39)
* show features on dashboard according to user perms ([b3c3a54](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b3c3a543c7c0cf369a574eed040bedc327b5a4c3))
* style login page ([987b0ba](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/987b0ba7816a598cf773d2d2d9c1d421e8a4cd63)), closes [#39](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/issues/39)
* update iris client ([1b8bc5f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/1b8bc5fc7ae60c8f5840d048807f2f143c3fb493))
* update iris client definition ([5c5943c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/5c5943c67356c4b6b48fa7c2276600db763fbfed))
* update schema of iris client ([8c81efd](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/8c81efd9c6374c4cf09070dc7062e035539c2b43))
* update subscriptions server ([fca6e45](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/fca6e456d2679269016bbeeb08872ab399365215))
* updated iris client definition ([07c70cb](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/07c70cb34447559287ac176dec9c441a60d6d496))
* utilize feature nav cards on dashboard ([cd9e00e](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cd9e00e606ed9187f08cae780fc37fce63abfe46))
* utilize subscriptions provider ([d0a7f8d](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/d0a7f8d17b18d320ebf81c0427f5db5032fd1403))


### Bug Fixes

* add editable flag to interns amb expectation fields ([f969290](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/f969290b14fe50c1dbf72ff71303ccc646df2de0))
* correctly close confirmation dialog ([8034546](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/803454638b7a28a2c6c74ac2695f60d476ba8b57))
* done internas ambulance expectation ordination ([cda6e8c](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/cda6e8cd220ce7e5f5100c00a17c8754f7f405fc))
* import of iris artefacts ([48b277f](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/48b277f82e7a799fcd80794d15cbdd2ea2a084d7))
* import production app css in root ([86f12fe](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/86f12fea5cf85e95da29301cb6e0850e350602d9))
* reset interns expectation ordination form ([80da5ee](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/80da5eee05ae85912fe2c1379ddc366356cf8e10))
* typing errors ([15c0f76](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/15c0f76e0ac375a85b1778938a8bf8edb164642f))
* update done button in interns expectation medications ([b3b7e18](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/b3b7e18419deeea83c3b5eeec9c5fae950086be3))
* update interns expectation lists ([fea31ab](https://gitlab.akesoapp.cz/dev/akeso-online/sirona/commit/fea31abb39b1b9c24a019131d16da3ac78b0a88d))
