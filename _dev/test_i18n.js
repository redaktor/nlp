// correct path below ...
var _i18n = require('./build/text/i18n/index');
var i18n = new _i18n();
var txt = 'In 1775, he became convinced that the American cause was noble. In the United States, he was made a major general. He was wounded during the Battle of Brandywine and served with distinction in the Battle of Rhode Island. In 1781, troops in Virginia under his command blocked British forces, leading to the decisive Siege of Yorktown. Lafayette returned to France and was elected a member of the Estates-General of 1789. After the storming of the Bastille, he was made head of the National Guard, and tried to steer a middle course through the French Revolution. In August 1792, the radical factions ordered his arrest. Fleeing through Belgium, he was captured by Austrian troops and spent more than five years in prison. In 1824, President James Monroe invited Lafayette to the United States, where he met a rapturous reception. During France\'s July Revolution of 1830, he supported Louis-Philippe as king, but turned against him when the monarch became autocratic.'
i18n.detect(txt, 5).then(
  function(languages){
    console.log('result: ', languages);
  },
  function(err){
    console.log('err:', err);
  }
);
//# sourceMappingURL=index.js.map
