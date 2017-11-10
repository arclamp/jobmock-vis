export function graphStructure (data) {
  // Create tables mapping from raw and group IDs to data indices.
  let raw = {};
  let group = {};
  data.forEach((d, i) => {
    raw[d._id] = i;

    if (d.groupId) {
      group[d.groupId] = i;
    }
  });

  // Fill in a link list.
  let link = [];
  data.forEach(d => {
    if (d.parentId) {
      const source = raw[d._id];
      const target = d.parentType === 'group' ? group[d.parentId] : raw[d.parentId];

      link.push({
        source,
        target
      });
    }
  });

  return {
    node: data,
    link
  };
}
