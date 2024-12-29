/*
 * Copyright (c) 2024 ThrRip, XMing (洺知-故犯)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export default async function () {
  const initialized = useState<boolean>('pinyinProInitialized', () => false)
  if (initialized.value) {
    const { pinyin } = await import('pinyin-pro')
    return pinyin
  }
  else {
    const { pinyin, customPinyin } = await import('pinyin-pro')
    customPinyin(useAppConfig().pinyinProCustomPinyin)
    initialized.value = true
    return pinyin
  }
}
