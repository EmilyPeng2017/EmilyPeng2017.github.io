# Hexo command notes on Windows

If PowerShell shows this error:

```text
hexo.ps1 cannot be loaded because running scripts is disabled on this system
```

use the Windows command shim instead:

```powershell
hexo.cmd <command>
```

Examples:

```powershell
hexo.cmd version
hexo.cmd generate
hexo.cmd server
```

This repository currently looks like the deployed/static site checkout. It does not contain the usual Hexo project files such as `_config.yml` and `package.json`, so generation commands may not work from `E:\hexo` until the full Hexo source project is restored.

The markdown source archive is here:

```text
source-archive/_posts
```
