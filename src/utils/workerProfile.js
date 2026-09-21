// Form <-> stored-profile helpers shared by BecomeWorker, Register and WorkerSettings.

export function workerFormFrom(profile) {
  return {
    category: profile?.category || '',
    subcategories: profile?.subcategories || [],
    experience: profile?.experience ?? 0,
    bio: profile?.bio || '',
    rates: {
      day: profile?.rates?.day ?? '',
      week: profile?.rates?.week ?? '',
      month: profile?.rates?.month ?? '',
    },
    cnicFile: null,
  };
}

const toRate = (value) => (value === '' || value == null ? undefined : Number(value) || undefined);

// Only rates that were filled in are sent, so blank inputs don't wipe existing ones.
export function workerPayloadFrom(form) {
  const rates = {};
  ['day', 'week', 'month'].forEach((key) => {
    const rate = toRate(form.rates?.[key]);
    if (rate !== undefined) rates[key] = rate;
  });

  return {
    category: form.category,
    subcategories: form.subcategories,
    experience: Number(form.experience) || 0,
    bio: form.bio.trim(),
    rates,
    ...(form.cnicFile ? { cnicFileName: form.cnicFile.name } : {}),
  };
}
