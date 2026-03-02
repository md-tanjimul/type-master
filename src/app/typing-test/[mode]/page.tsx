import GeneralMode from "@/_features/typing-test/general/components/GeneralMode/GeneralMode";
import StrictMode from "@/_features/typing-test/strict/components/StrictMode/StrictMode";
import InstantDeathMode from "@/_features/typing-test/instant_death/components/InstantDeathMode/InstantDeathMode";
import BlindMode from "@/_features/typing-test/blind/components/BlindMode/BlindMode";
import MemoryMode from "@/_features/typing-test/memory/components/MemoryMode/MemoryMode";
import HardcoreMode from "@/_features/typing-test/hardcore/components/HardcoreMode/HardcoreMode";


type PageProps = {
  params: { mode: string }
}

export default async function Page({ params }: PageProps) {
  const { mode } = await Promise.resolve(params);

  return (
    <>

    {
      mode === 'general' ?
      <GeneralMode mode={mode} />
      :
      mode === 'strict' ?
      <StrictMode mode={mode} />
      :
      mode === 'instant-death' ?
      <InstantDeathMode mode={mode} />
      :
      mode === 'blind' ?
      <BlindMode mode={mode} />
      :
      mode === 'hardcore' ?
      <HardcoreMode mode={mode} />
      :
      mode === 'memory' ?
      <MemoryMode mode={mode} />
      :
      ''
    }

    </>
  );
}

