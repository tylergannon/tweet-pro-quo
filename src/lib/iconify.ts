
import { icons as riIcons, type IconifyJSON } from '@iconify-json/ri';
import { getIconData as _getIconData } from '@iconify/utils';
type IconSource = 'ri';
const data: Record<IconSource, IconifyJSON> = {
	'ri': riIcons,
};

export type IconName = `${IconSource}:${string}`;

export function getIconData(name: IconName) {
	const [collection, iconName] = name.split(':') as [IconSource, string];

	const iconData = _getIconData(data[collection], iconName);
	if (iconData === null) {
		throw new Error(`Icon name ${name} couldn't be loaded.`);
	}
	return iconData;
}
